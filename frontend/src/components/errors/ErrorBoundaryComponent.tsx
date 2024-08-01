import { FallbackProps } from "react-error-boundary";

export function RenderError(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  return (
    <div className='error-page'>
      <div className='text-center'>
        <h1 className='text-5xl'>Error!! 🌍</h1>
        <p className='text-2xl'>{error.message}</p>
        <button
          className='mt-4'
          onClick={resetErrorBoundary}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
