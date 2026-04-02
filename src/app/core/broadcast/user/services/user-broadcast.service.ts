import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';
import { UserBroadcastMessages } from '../interfaces/user-broadcast-messages.interface';
import { BroadcastMessage } from '../../interfaces/broadcast-message.interface';
import { BroadcastEventKey } from '../../enums/broadcast-event.enum';
import { LoginBroadcastMessage, LogoutBroadcastMessage, TokensUpdateBroadcastMessage } from '../messages/user-broadcast-auth';

@Injectable({ providedIn: 'root' })
export class UserBroadcastService {
	private readonly messages$ = new Subject<BroadcastMessage>();
	private channel?: BroadcastChannel;
	private platformId = inject(PLATFORM_ID);
	private isBroadcastChannelAvailable = false;
	private isBrowser = false;

	private readonly CHANNEL_NAME = 'archolos-user-broadcast-channel';
	private readonly LOCAL_STORAGE_KEY = 'archolos-user-broadcast-fallback';

	constructor() {
		// Ensures that SSR builds won’t crash, since no window or localStorage calls happen during server rendering.
		this.isBrowser = isPlatformBrowser(this.platformId);

		// Only initialize in browser context
		if (this.isBrowser) {
			this.initializeChannel();
		}
	}

	private initializeChannel(): void {
		// Try BroadcastChannel
		if ('BroadcastChannel' in window) {
			try {
				this.channel = new BroadcastChannel(this.CHANNEL_NAME);
				this.isBroadcastChannelAvailable = true;

				this.channel.onmessage = (event) => this.messages$.next(event.data);
			} catch (error) {
				console.warn('BroadcastChannel not available:', error);
			}
		}

		// Fallback to localStorage if BroadcastChannel not available
		if (!this.isBroadcastChannelAvailable) {
			window.addEventListener('storage', (event: StorageEvent) => {
				if (event.key === this.LOCAL_STORAGE_KEY && event.newValue) {
					try {
						const message = JSON.parse(event.newValue) as BroadcastMessage;
						this.messages$.next(message);
					} catch (e) {
						console.error('Failed to parse storage message:', e);
					}
				}
			});
		}
	}

	/**
	 * Publish a message (BroadcastChannel or localStorage fallback)
	 */
	public publish<T>(key: BroadcastEventKey, data?: T): void {
		if (!this.isBrowser) return; // SSR guard

		const message: BroadcastMessage<T> = { key, data };

		if (this.isBroadcastChannelAvailable && this.channel) {
			this.channel.postMessage(message);
		} else {
			try {
				localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(message));
				localStorage.removeItem(this.LOCAL_STORAGE_KEY);
			} catch (e) {
				console.error('Broadcast fallback failed:', e);
			}
		}
	}

	public sendMessage(message: UserBroadcastMessages): void {
		this.publish(message.key, message.data);
	}

	// Listen for messages with specific key
	public on(key: BroadcastEventKey.Login): Observable<LoginBroadcastMessage['data']>;
	public on(key: BroadcastEventKey.Logout): Observable<LogoutBroadcastMessage['data']>;
	public on(key: BroadcastEventKey.TokensUpdate): Observable<TokensUpdateBroadcastMessage['data']>;
	public on<T>(key: BroadcastEventKey.Custom): Observable<T>;
	public on<T>(key: BroadcastEventKey): Observable<T> {
		return this.messages$.asObservable().pipe(
			filter((message) => message.key === key),
			map((message) => message.data as T)
		);
	}

	// Clean up resources
	public ngOnDestroy(): void {
		if (this.channel) this.channel.close();
		this.messages$.complete();
	}
}
