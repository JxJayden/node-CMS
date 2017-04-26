(function() {
    var equipProduct = {
        bindEvent: function() {
            $('.card-star').click(function() {
                var _id = $(this).parents('.card-item').data('id');
                if ($(this).attr('id') === 'star-on') {
                    //取消星标事件
                    $(this).parent().children('#star-on').addClass('card-star-hide');
                    $(this).parent().children('#star-off').removeClass('card-star-hide');
                } else {
                    $(this).parent().children('#star-off').addClass('card-star-hide');
                    $(this).parent().children('#star-on').removeClass('card-star-hide');
                }
            });
            //详情下拉动画-
            $('.card-more').click(function(e) {
                e.preventDefault();
                $(this).parent().next().removeClass('card-cover-hide');
            });
            $('.card-des').click(function(e) {
                e.preventDefault();
            })
            $('.card-close-cover').click(function(e) {
                e.preventDefault();
                $(this).parent().parent().addClass('card-cover-hide');
            })
            $('.card-img-more').each(function() {
                var arr = [];
                $(this).children('a').each(function() {
                    arr.push({src: $(this).attr('href')});
                });
                $(this).magnificPopup({
                    items: arr,
                    type: 'image',
                    closeBtnInside: false,
		            fixedContentPos: true,
                    gallery: { enabled: true }
                });
            });
        },
        // 根据 localStorage 更新星标
		setStar: function() {
			var quoteLocalStage = store.get('quote');
			if (quoteLocalStage && quoteLocalStage.product) {
				var productArr = quoteLocalStage.product;
				var $star = $('.card-star');
				$star.each(function() {
					if(~productArr.indexOf($(this).data('id'))) {
						$(this).parent().children('#star-off').addClass('card-star-hide');
						$(this).parent().children('#star-on').removeClass('card-star-hide');
					}
				})
			}
		},
        init: function() {
            var _this = this;
            _this.bindEvent();
            _this.setStar();
        }
    }
    equipProduct.init();
})()
