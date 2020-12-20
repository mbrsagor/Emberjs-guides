import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('post', {path: '/posts/:post_id'}, function() {
    this.route('files', function() {
      this.route('other');
    });
  });
});

export default Router;
