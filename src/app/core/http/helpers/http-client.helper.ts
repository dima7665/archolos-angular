import { HttpContext, HttpParameterCodec, HttpParams } from '@angular/common/http';

export class HttpClientHelper {
	// public static getDefaultContext(context: Nullable<HttpContext>): HttpContext {
	// 	if (!context) {
	// 		return new HttpContext().set(NGX_LOADING_BAR_IGNORED, true);
	// 	}

	// 	if (context.has(NGX_LOADING_BAR_IGNORED)) {
	// 		return context;
	// 	}

	// 	return context.set(NGX_LOADING_BAR_IGNORED, true);
	// }

	public static toHttpParams(obj: Nullable<Record<string, unknown>>, clearNull = false): Nullable<HttpParams> {
		if (!obj) {
			return new HttpParams({ encoder: new CustomHttpParamEncoder() });
		}

		const keys = Object.keys(obj);
		const pairs = [];

		for (const key of keys) {
			const keyPairs = HttpClientHelper.toKeyValuePairs(key, obj[key], clearNull);
			pairs.push(...keyPairs);
		}

		return pairs.reduce(
			(params, pair) => params.append(pair['key'], pair['value']),
			new HttpParams({ encoder: new CustomHttpParamEncoder() })
		);
	}

	public static isPrimitive(value: unknown): value is string | number | boolean | symbol | bigint {
		return ['string', 'number', 'boolean', 'symbol', 'bigint'].includes(typeof value);
	}

	private static toKeyValuePairs(prefix: string, obj: unknown, clearNull = false): Array<Record<string, string>> {
		// skip undefined
		if (obj === undefined) {
			return [];
		}

		if (obj === null && clearNull) {
			return [];
		}

		if (obj === null) {
			obj = '';
		}

		if (obj instanceof Date) {
			obj = obj.toISOString();
		}

		if (HttpClientHelper.isPrimitive(obj)) {
			return [{ key: prefix, value: String(obj) }];
		}

		const keys = Object.keys(obj as object);
		const pairs = keys.map((key) => {
			const keyPrefix = `${prefix}.${key}`;

			return HttpClientHelper.toKeyValuePairs(keyPrefix, (obj as Record<string, unknown>)[key], clearNull);
		});

		return pairs.reduce((accumulator, value) => accumulator.concat(value), []);
	}
}

export class CustomHttpParamEncoder implements HttpParameterCodec {
	public encodeKey(key: string): string {
		return encodeURIComponent(key);
	}

	public encodeValue(value: string): string {
		return encodeURIComponent(value);
	}

	public decodeKey(key: string): string {
		return decodeURIComponent(key);
	}

	public decodeValue(value: string): string {
		return decodeURIComponent(value);
	}
}
