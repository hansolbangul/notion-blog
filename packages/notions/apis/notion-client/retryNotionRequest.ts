const DEFAULT_RETRY_COUNT = 3;
const DEFAULT_RETRY_DELAY = 400;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(error: unknown) {
  if (!(error instanceof Error)) return false;

  const message = error.message || "";
  return (
    message.includes("429") ||
    message.includes("502") ||
    message.includes("503") ||
    message.includes("504") ||
    message.includes("ETIMEDOUT") ||
    message.includes("ECONNRESET")
  );
}

function getRetryDelay(error: unknown, attempt: number) {
  if (error instanceof Error && error.message.includes("429")) {
    return 1200 * attempt;
  }

  return DEFAULT_RETRY_DELAY * attempt;
}

export async function retryNotionRequest<T>(
  request: () => Promise<T>,
  label: string,
  retryCount: number = DEFAULT_RETRY_COUNT,
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retryCount; attempt++) {
    try {
      return await request();
    } catch (error) {
      lastError = error;

      if (!shouldRetry(error) || attempt === retryCount) {
        break;
      }

      console.warn(`[notion:${label}] transient failure, retrying`, {
        attempt,
        retryCount,
        message: error instanceof Error ? error.message : String(error),
      });

      await sleep(getRetryDelay(error, attempt));
    }
  }

  throw lastError;
}
