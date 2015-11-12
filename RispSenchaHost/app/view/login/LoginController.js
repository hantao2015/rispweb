/**
 * Created by Administrator on 2015/6/2.
 */
Ext.define('RispSenchaHost.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: [
        'Ext.util.Cookies',
        'RispSenchaHost.AppData',
        'RispSenchaHost.LoginManager',
        'RispSenchaHost.TestHantao',
        'RispSenchaHost.model.User',
        'RispSenchaHost.view.login.LoginModel'
    ],

    loginText: 'Logging in...',
    init: function() {
        this.getView().title=RispSenchaHost.AppData.getMsgString('TITLE_MENU_SYS_LOGIN_PAGE');
        this.lookupReference('usernamefield').setFieldLabel(RispSenchaHost.AppData.getMsgString('MUI_271438352130'));
        this.lookupReference('userpassfield').setFieldLabel(RispSenchaHost.AppData.getMsgString('MUI_271438357677'));
        this.lookupReference('hintdisplayfield').setValue(RispSenchaHost.AppData.getMsgString('MUI_329518016609'));
    },
    onSpecialKey: function(field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    onLoginClick: function() {
        //console.log('login:'+Ext.DomQuery.selectValue('MUI_CONFIRM',RispSenchaHost.AppData.xmlData));

       // alert(RispSenchaHost.AppData.getMsgString('TITLE_LOGINUSER'));
        this.doLogin();
    },

    doLogin: function() {
        var form = this.lookupReference('form');
        var userdata= form.getValues();
        Ext.util.Cookies.set("userpass",userdata.upass);
        Ext.util.Cookies.set("username",userdata.user);

        if (form.isValid()) {
            Ext.getBody().mask(this.loginText);
            if (!this.testHantao)
            {
                this.testHantao=new RispSenchaHost.TestHantao();
            }
            if (!this.loginManager) {
                this.loginManager = new RispSenchaHost.LoginManager({
                    session: this.getView().getSession(),
                    model: 'RispSenchaHost.model.User'
                });
            }
            this.loginManager.login({
                data: form.getValues(),
                scope: this,
                success: 'onLoginSuccess',
                failure: 'onLoginFailure'
            });

        }
    },

    onLoginFailure: function() {
        // Do something
        Ext.getBody().unmask();
    },

    onLoginSuccess: function(user) {
        Ext.getBody().unmask();

        var org = 'realsungroup';//this.lookupReference('organization').getSelectedRecord();
        this.fireViewEvent('login', this.getView(), user, this.loginManager);
    }
});
