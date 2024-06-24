# This applies to https://admin.shopify.com/store/jkyoggiftshop/settings/checkout
# Scroll below and you will find additional scripts section
# The script is already pasted there incase on future modifications it should be pasted there.
# This script redirects to the thankyou page with order-ID in the urlParams.



<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function(event) { 

        if (window.location.pathname.includes('/checkouts/') && 
            document.body.innerHTML.includes('Thank you for your purchase')) {
                
            var orderElementText = document.querySelector('.os-order-number').innerText;
            
            // Extract the number from the order element text
            var orderNumberMatch = orderElementText.match(/\d+/);
            if (orderNumberMatch) {
                var orderNumber = orderNumberMatch[0]; 
                var encodedOrderNumber = encodeURIComponent(orderNumber);
                
                // Alert only the order number
               // alert(orderNumber);

                // Redirect using only the order number
                 window.location.replace("http://localhost:3000/giftshop/thank?order="+encodedOrderNumber);
            }
        }
    });
</script>

