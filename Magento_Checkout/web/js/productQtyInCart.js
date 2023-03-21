define([
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'jquery',
    'ko',
    'underscore'
], function (Component, customerData, $, ko, _) {
    'use strict';

    return Component.extend({

        /**
         * @override
         */
        initialize: function () {
            var self = this,
                cartData = customerData.get('cart');

            this.summaryCount = (cartData().summary_count) ? cartData().summary_count : 0;

            this.observe(['summaryCount']);

            cartData.subscribe(function (cartInfo) {
                self.summaryCount(cartInfo['summary_count']);
            }, this)

            if (
                cartData().website_id !== window.checkout.websiteId &&
                cartData().website_id !== undefined
            ) {
                customerData.reload(['cart'], false);
            }

            return this._super();
        },
    });
});
