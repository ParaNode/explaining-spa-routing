import './style.css'
import { SimpleRouter } from './simple-router/simple-router'
import { HashRoutingStrategy } from './simple-router/hash-routing.strategy';
import { HistoryRoutingStrategy } from './simple-router/history-routing.strategy';

const router = new SimpleRouter(
  new HistoryRoutingStrategy()
  // new HashRoutingStrategy()
);

router.initialize();
