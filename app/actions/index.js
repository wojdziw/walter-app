import * as OrderActions from './order';
import * as PaymentActions from './payment';
import * as NavigationActions from './navigation';


export const ActionCreators = Object.assign({},
  OrderActions,
  PaymentActions,
  NavigationActions
);
