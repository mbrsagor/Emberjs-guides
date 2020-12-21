import Component from '@ember/component';

export default Component.extend({
    actions: {
        clickItem(item){
            alert(`${item} is clicked`);
        }
    }
});
