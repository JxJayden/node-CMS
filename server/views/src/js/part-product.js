(function() {
    var partProduct = {
        bindEvent: function() {
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

            $('body').on('click', '.tab-item', function(e) {
                e.preventDefault();
                var $id = $(this).data('id');
                var $this = $(this);
                if($this.hasClass('item-select')) return false;

                $(this).siblings().removeClass('item-select');
                $(this).addClass('item-select');
                $('.card').removeClass('card-show');
                $('#' + $id).addClass('card-show');
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
            this.bindEvent();
            this.setStar();
        }
    };
    partProduct.init();
})()
