import { ExtendableError } from 'ts-error';

/**
 * A special exception used to intentionally halt the execution flow.
 *
 * This exception is raised in controlled situations where continuing
 * the current operation is not possible or desired (e.g., an expired
 * refresh token), but the condition is not considered an actual error
 * that should be logged or reported.
 *
 * Intended to be caught and handled gracefully to stop further processing.
 */
export class ExecutionHaltError extends ExtendableError {}

export class WorkerTokenError extends ExecutionHaltError {}
