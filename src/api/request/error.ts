enum ErrorMessages {
  Unknown = 'Unknown Server Error',
}

export interface ServerError {
  title: string;
  code: number;
  errors: Record<string, string[]>;
}

export const getUnknownError = (): ServerError => ({
  title: ErrorMessages.Unknown,
  code: 500,
  errors: {},
});
