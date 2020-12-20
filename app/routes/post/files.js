import Route from '@ember/routing/route';

export default Route.extend({
    // model() {
    //     const post = this.modelFor('post');
    //     return this.store.query('file', { param: post });
    // }
    model() {
        return this.store.findAll('post');
    },

    setupController(controller, model) {
        controller.set('posts', model);
        this.store.findAll('tag').then(function(tags) {
        controller.set('tags', tags);
        });
        this.store.findAll('category').then(function(categories) {
        controller.set('categories', categories);
        });
    }

});
