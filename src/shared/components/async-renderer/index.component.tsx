import React from 'react';

import { TextLoader } from 'shared/components/loader/index.component';
import { ErrorText } from 'shared/components/error-text/index.component';

type PrimitiveDivPropTypes = React.ComponentPropsWithoutRef<'div'>;
type AsyncRendererElement = React.ElementRef<'div'>;

interface AsyncRendererPropTypes<DataType> extends Omit<PrimitiveDivPropTypes, 'children'> {
  isLoading?: boolean;
  error?: Error | null;
  data?: DataType | null;
  loader?: React.ReactNode;
  children?: ((data: DataType) => React.ReactNode) | React.ReactNode;
}

export const AsyncRenderer = React.forwardRef<AsyncRendererElement, AsyncRendererPropTypes<any>>(
  ({ isLoading, error, data, loader, children, ...rest }, forwardedRef) => {
    if (isLoading) {
      return (
        <div {...rest} ref={forwardedRef}>
          {loader || <TextLoader isLoading={isLoading} />}
        </div>
      );
    }

    if (error) {
      return (
        <div {...rest} ref={forwardedRef}>
          <ErrorText>{error.message}</ErrorText>
        </div>
      );
    }

    return (
      <div {...rest} ref={forwardedRef}>
        {typeof children === 'function' ? children(data) : children}
      </div>
    );
  }
);
