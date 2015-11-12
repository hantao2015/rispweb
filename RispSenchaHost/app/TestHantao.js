/**
 * Created by Administrator on 2015/6/4.
 */
Ext.define('RispSenchaHost.TestHantao', { requires: [
    'Ext.Ajax',
    'Ext.MessageBox',
    'Ext.data.schema.Schema',
    'Ext.window.MessageBox'
],

    config: {
        /**
         * @cfg {Class} model
         * The model class from which to create the "user" record from the login.
         */
        model: null,

        /**
         * @cfg {Ext.data.Session} session
         */
        session: null
    },

    constructor: function (config) {
        this.initConfig(config);
    }
});