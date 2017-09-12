import * as OrderActions from './order';
import * as PaymentActions from './payment';
import * as NavigationActions from './navigation';

const ActionCreators = Object.assign({},
  OrderActions,
  PaymentActions,
  NavigationActions,
);

export default ActionCreators;
