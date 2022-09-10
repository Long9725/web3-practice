import { ReactNode, FunctionComponent } from "react";
import Navbar from "../navbar/index";

// from https://stackoverflow.com/questions/59106742/typescript-error-property-children-does-not-exist-on-type-reactnode
// For "@types/react": "17.0.43", or less than 18
// 
// interface FunctionComponent<P = {}> {
//     (props: PropsWithChildren<P>, context?: any): ReactElement | null;
//     propTypes?: WeakValidationMap<P>;
//     contextTypes?: ValidationMap<any>;
//     defaultProps?: Partial<P>;
//     displayName?: string;
// }
// 
// PropsWithChildren에 관한 코드
// 
// type PropsWithChildren<P> = P & { children?: ReactNode };
//
// 강의 코드
// 
// const BaseLayout : FunctionComponent = ({children: ReactNode}) => {
//     return (
//         <div>
//             {children}
//         </div>
//     )
// }

// For "@types/react" > 18
//
// interface FunctionComponent<P = {}> {
//     (props: P, context?: any): ReactElement<any, any> | null;
//     propTypes?: WeakValidationMap<P> | undefined;
//     contextTypes?: ValidationMap<any> | undefined;
//     defaultProps?: Partial<P> | undefined;
//     displayName?: string | undefined;
// }
// 
// 강의는 react 버전이 18 미만이기 때문에, FunctionComponent를 사용하려면 P type을 직접 지정해줘야한다.
// 강의에서 P type을 직접 지정해주지 않아도 바로 사용할 수 있었던 이유는 children 자체가 ReactNode 유형이기 때문이다.
// 정리하자면 react 18 버전부터 암묵적인 children 선언을 제거했기 때문이다.

// stackoverflow에서는 interface를 사용하던데, 굳이 이렇게 안하고 type으로 해도 되는 듯 하다. 무슨 차이지...?
// interface BaseLayoutProps {
//     children?: ReactNode;
// }

type Props = {
  children?: ReactNode;
};

const BaseLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="py-16 bg-gray-50 overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div></>

  );
};

export default BaseLayout;