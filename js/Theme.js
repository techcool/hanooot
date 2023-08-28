
   jQuery(document).ready(function(){
   	
 jQuery("#flip").on("click", function() {
        jQuery("#panel").slideToggle("slow")
      });
      jQuery("#flip").on("click", function() {
        jQuery("#flip").fadeOut(function() {
          jQuery("#flip").text((jQuery("#flip").text() == "[Show More]") ? "[Show Less]" : "[Show More]").fadeIn();
        })
      })


  jQuery(".closeMessage").click(function(){
    jQuery("#ordermessage").hide();
  });

  jQuery(document).ready(function() {
      jQuery(".FilterBox a").click(function() {
        jQuery("#filterSearch").slideToggle();
      });
  });


  jQuery(".FraudAnalysis a").click(function() {
      jQuery(".FraudAnalysispopup").show();
      jQuery(".overlay").show();
  });

        jQuery(".closeMessage").click(function() {
          jQuery(".FraudAnalysispopup").hide();
          jQuery(".overlay").hide();
        });


         jQuery("a.ShippingPopup").click(function() {
          jQuery(".EditShippingAddressPopup").show();
          jQuery(".overlay").show();
        });

        jQuery(".closeMessage").click(function() {
          jQuery(".EditShippingAddressPopup").hide();
          jQuery(".overlay").hide();
        });



         jQuery("a.Shippedbtn").click(function() {
          jQuery(".orderShipped").show();
          jQuery(".overlay").show();
        });

        jQuery(".closeMessage").click(function() {
          jQuery(".orderShipped").hide();
          jQuery(".overlay").hide();
        });



    jQuery("a.CancelOrderbtn").click(function() {
          jQuery(".CancelOrderPopup").show();
          jQuery(".overlay").show();
        });

        jQuery(".closeMessage").click(function() {
          jQuery(".CancelOrderPopup").hide();
          jQuery(".overlay").hide();
        });
    jQuery(".customerList #checkAll").on('click', function(){
      if(jQuery(this).prop('checked')){
        $('.block-unblock-btn').addClass('show')
      }else{
        $('.block-unblock-btn').removeClass('show')
      }
    })
    jQuery(".custom-control-input").on('click', function(){
      if(jQuery(this).prop('checked')){
        $('.block-unblock-btn').addClass('show')
      }else{
        if(jQuery(this).parent().parent().parent().siblings().find('.custom-control-input').prop('checked')){
          $('.block-unblock-btn').addClass('show')
          console.log('hello')
        }else{
          $('.block-unblock-btn').removeClass('show')
          console.log('hi')

        }
      }
    })

    



    jQuery('.openPopup').on('click', function(e){
      e.preventDefault();
      openPopup();
    })
    jQuery('.openUnblockPopup').on('click', function(e){
      e.preventDefault();
      openUnBlockPopup();
    })
    jQuery('.block-customer .Cancelbtn').on('click', function(e){
      e.preventDefault();
      closePopup();
    })
    jQuery('.unblock-customer .Cancelbtn').on('click', function(e){
      e.preventDefault();
      closePopup();
    })

    jQuery('.openToolTip').on('click', function(){
        jQuery('#ordermessage.block-customer-tooltip').css('display','flex')
        closePopup();
    })
    jQuery('.openUnblockToolTip').on('click', function(){
        jQuery('#ordermessage.unblock-customer-tooltip').css('display','flex')
        closePopup();
        jQuery('#editBtn').removeClass("inActiveBtn")
    })


    

    jQuery('.closeMessage2').on('click', function(){
      closeToolTip()
    })
    jQuery('.unblockcloseMessage').on('click', function(){
      closeToolTip2()
    })


    const openPopup= function(){
      jQuery(".orderShipped.block-customer").show();
      jQuery(".overlay").show();
    }
    const openUnBlockPopup= function(){
      jQuery(".orderShipped.unblock-customer").show();
      jQuery(".overlay").show();
    }
    const closePopup= function(){
      jQuery(".orderShipped").hide();
      jQuery(".overlay").hide();
    }

    const closeToolTip = function(){
       jQuery('.block-customer-tooltip').hide()
    }
    const closeToolTip2 = function(){
       jQuery('.unblock-customer-tooltip').hide()
    }


  
});    


