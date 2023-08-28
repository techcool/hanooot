window.integraion = window.integraion || {};
integraion.data = {
  orderTable: ".order_table_wrap table",
  table_preloader: "#table_preloader",
  orderDetailsWrap: ".orderDetailsWrap",
  orderDetailsLoader: ".detailsLoader",
  orderItemDetails: {},
};

integraion.get = async function (type) {
  let url = type == "all-orders" ? "orderData.json" : "orderDetails.json";
  try {
    const response = await fetch(`./data/${url}`);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

integraion.allOrders = function () {
  let data = [];
  setTimeout(async () => {
    data = await integraion.get("all-orders");

    integraion.renderOrders(data);
  }, 3000);

  return data;
};
integraion.formatTimestamp = function (timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" }); // Full month name (e.g., January)
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Convert hours to 12-hour format and determine AM/PM
  let amPm = "AM";
  let formattedHours = hours;
  if (hours >= 12) {
    amPm = "PM";
    formattedHours = hours === 12 ? 12 : hours - 12;
  }
  if (formattedHours === 0) {
    formattedHours = 12; // Midnight (12 AM) in 12-hour format
  }

  // Add leading zeros for single-digit values
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Return the formatted date and time

  return `${day} ${month}, ${year} | ${formattedHours}:${formattedMinutes} ${amPm}`;
};
integraion.getOrderStatus = function (item) {
  let className =
    item.order_status.charAt(0).toUpperCase() + item.order_status.slice(1);
  let name =
    item.order_status.charAt(0).toUpperCase() + item.order_status.slice(1);
  if (item.order_status == "placed") {
    className = "OrderPlaced";
    name = "Order Placed";
  }
  if (item.order_status == "outfordelivery") {
    className = "OutDelivery";
    name = "Out for delivery";
  }
  if (item.order_status == "returned") {
    className = "Return";
    name = "Returned";
  }
  return {
    className: `${className}_btn_color`,
    name: name,
  };
};
integraion.renderOrders = function (data) {
  let html = "";
  data.map((item, index) => {
    const timestamp = item.created_at;
    const formatted = integraion.formatTimestamp(timestamp);
    html += `<tr class="ProcessingStatus odd" role="row">
        <td class="sorting_1">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheckBox${
              item.id
            }" required="">
          </div>
        </td>
        <td class="IDColor"><a href="/html/Admin/WithJs/OrderStatusPending.html?order_id=${
          item.id
        }">#${item.id}</a></td>
        <td class="CNColor"><a href="/html/Admin/WithJs/OrderStatusPending.html?order_id=${
          item.id
        }">${item.User.full_name}</a></td>
        <td class="ODColor">${formatted}</td>
        <td class="VNColor">${item.ManagementProduct.vendor}</td>
        <td>
          <a href="#" class="tableBtn  ${
            integraion.getOrderStatus(item).className
          }">${integraion.getOrderStatus(item).name}</a>
        </td>
        <td>
          <a href="#" class="tableBtn ${
            item.payment_status.charAt(0).toUpperCase() +
            item.payment_status.slice(1)
          }_btn_color">${item.payment_status}</a>
        </td>
        <td class="AmColor">$${item.total_payable_amount}</td>
        <td>
          <div class="dropdown ms-auto text-center c-pointer">
            <div class="btn-link" data-bs-toggle="dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"></rect>
                  <circle fill="#000000" cx="12" cy="5" r="2"></circle>
                  <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                  <circle fill="#000000" cx="12" cy="19" r="2"></circle>
                </g>
              </svg>
            </div>
            <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item downloadInvoice" href="#">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_688_32076)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.23394 0.984049C9.43711 0.780885 9.71266 0.666748 9.99998 0.666748C10.2873 0.666748 10.5628 0.780885 10.766 0.984049C10.9692 1.18721 11.0833 1.46276 11.0833 1.75008V13.2226L14.6475 9.64758C14.7485 9.54657 14.8684 9.46645 15.0004 9.41178C15.1323 9.35712 15.2738 9.32898 15.4166 9.32898C15.5595 9.32898 15.7009 9.35712 15.8329 9.41178C15.9649 9.46645 16.0848 9.54657 16.1858 9.64758C16.2868 9.74859 16.3669 9.8685 16.4216 10.0005C16.4763 10.1325 16.5044 10.2739 16.5044 10.4167C16.5044 10.5596 16.4763 10.701 16.4216 10.833C16.3669 10.965 16.2868 11.0849 16.1858 11.1859L10.7691 16.6026C10.6684 16.7041 10.5486 16.7847 10.4166 16.8397C10.2846 16.8947 10.143 16.923 9.99998 16.923C9.85696 16.923 9.71537 16.8947 9.58335 16.8397C9.45134 16.7847 9.33152 16.7041 9.23081 16.6026L3.81414 11.1859C3.61015 10.9819 3.49554 10.7052 3.49554 10.4167C3.49554 10.1283 3.61015 9.85158 3.81414 9.64758C4.01814 9.44359 4.29482 9.32898 4.58331 9.32898C4.8718 9.32898 5.14848 9.44359 5.35248 9.64758L8.91664 13.2226V1.75008C8.91664 1.46276 9.03078 1.18721 9.23394 0.984049ZM0.25002 19.0834H19.75C20.0373 19.0834 20.3129 19.1975 20.5161 19.4007C20.7192 19.6038 20.8334 19.8794 20.8334 20.1667C20.8334 20.454 20.7192 20.7296 20.5161 20.9327C20.3129 21.1359 20.0373 21.25 19.75 21.25H0.25002C-0.0372975 21.25 -0.312848 21.1359 -0.516012 20.9327C-0.719176 20.7296 -0.833313 20.454 -0.833313 20.1667C-0.833313 19.8794 -0.719176 19.6038 -0.516012 19.4007C-0.312848 19.1975 -0.0372975 19.0834 0.25002 19.0834Z" fill="#78828A"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_688_32076">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)"></rect>
                    </clipPath>
                  </defs>
                </svg>Download Invoice
              </a>
              <a class="dropdown-item DownloadReceipt" href="#">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_688_32076)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.23394 0.984049C9.43711 0.780885 9.71266 0.666748 9.99998 0.666748C10.2873 0.666748 10.5628 0.780885 10.766 0.984049C10.9692 1.18721 11.0833 1.46276 11.0833 1.75008V13.2226L14.6475 9.64758C14.7485 9.54657 14.8684 9.46645 15.0004 9.41178C15.1323 9.35712 15.2738 9.32898 15.4166 9.32898C15.5595 9.32898 15.7009 9.35712 15.8329 9.41178C15.9649 9.46645 16.0848 9.54657 16.1858 9.64758C16.2868 9.74859 16.3669 9.8685 16.4216 10.0005C16.4763 10.1325 16.5044 10.2739 16.5044 10.4167C16.5044 10.5596 16.4763 10.701 16.4216 10.833C16.3669 10.965 16.2868 11.0849 16.1858 11.1859L10.7691 16.6026C10.6684 16.7041 10.5486 16.7847 10.4166 16.8397C10.2846 16.8947 10.143 16.923 9.99998 16.923C9.85696 16.923 9.71537 16.8947 9.58335 16.8397C9.45134 16.7847 9.33152 16.7041 9.23081 16.6026L3.81414 11.1859C3.61015 10.9819 3.49554 10.7052 3.49554 10.4167C3.49554 10.1283 3.61015 9.85158 3.81414 9.64758C4.01814 9.44359 4.29482 9.32898 4.58331 9.32898C4.8718 9.32898 5.14848 9.44359 5.35248 9.64758L8.91664 13.2226V1.75008C8.91664 1.46276 9.03078 1.18721 9.23394 0.984049ZM0.25002 19.0834H19.75C20.0373 19.0834 20.3129 19.1975 20.5161 19.4007C20.7192 19.6038 20.8334 19.8794 20.8334 20.1667C20.8334 20.454 20.7192 20.7296 20.5161 20.9327C20.3129 21.1359 20.0373 21.25 19.75 21.25H0.25002C-0.0372975 21.25 -0.312848 21.1359 -0.516012 20.9327C-0.719176 20.7296 -0.833313 20.454 -0.833313 20.1667C-0.833313 19.8794 -0.719176 19.6038 -0.516012 19.4007C-0.312848 19.1975 -0.0372975 19.0834 0.25002 19.0834Z" fill="#78828A"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_688_32076">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)"></rect>
                    </clipPath>
                  </defs>
                </svg>Download Receipt
              </a>
              <a class="dropdown-item ConfirmOrder" href="#">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.5 3.99992C14.75 2.24992 12.4167 1.33325 10 1.33325C7.58337 1.33325 5.25004 2.24992 3.50004 3.99992C1.75004 5.74992 0.833374 8.08325 0.833374 10.4999C0.833374 12.9166 1.75004 15.2499 3.50004 16.9999C5.25004 18.7499 7.58337 19.6666 10 19.6666C12.4167 19.6666 14.75 18.7499 16.5 16.9999C18.25 15.2499 19.1667 12.9166 19.1667 10.4999C19.1667 8.08325 18.25 5.74992 16.5 3.99992ZM15.3334 15.8333C13.9167 17.2499 12 17.9999 10 17.9999C8.00004 17.9999 6.08337 17.2499 4.66671 15.8333C3.25004 14.4166 2.50004 12.4999 2.50004 10.4999C2.50004 8.49992 3.25004 6.58325 4.66671 5.16659C6.08337 3.74992 8.00004 2.99992 10 2.99992C12 2.99992 13.9167 3.74992 15.3334 5.16659C16.75 6.58325 17.5 8.49992 17.5 10.4999C17.5 12.4999 16.75 14.4166 15.3334 15.8333ZM13.5834 7.41659L9.16671 11.8333L7.25004 9.91659C6.91671 9.58325 6.41671 9.58325 6.08337 9.91659C5.75004 10.2499 5.75004 10.7499 6.08337 11.0833L8.58337 13.5833C8.75004 13.7499 9.00004 13.8333 9.16671 13.8333C9.33337 13.8333 9.58337 13.7499 9.75004 13.5833L14.75 8.58325C15.0834 8.24992 15.0834 7.74992 14.75 7.41659C14.4167 7.08325 13.9167 7.08325 13.5834 7.41659Z" fill="#78828A"></path>
                </svg>
                Confirm Order
              </a>
              <a class="dropdown-item MakeVoid" href="#">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99999 18.8334C8.84721 18.8334 7.76388 18.6147 6.74999 18.1772C5.7361 17.7397 4.85416 17.1459 4.10416 16.3959C3.35416 15.6459 2.76041 14.764 2.32291 13.7501C1.88541 12.7362 1.66666 11.6529 1.66666 10.5001C1.66666 9.3473 1.88541 8.26397 2.32291 7.25008C2.76041 6.23619 3.35416 5.35425 4.10416 4.60425C4.85416 3.85425 5.7361 3.2605 6.74999 2.823C7.76388 2.3855 8.84721 2.16675 9.99999 2.16675C11.1528 2.16675 12.2361 2.3855 13.25 2.823C14.2639 3.2605 15.1458 3.85425 15.8958 4.60425C16.6458 5.35425 17.2396 6.23619 17.6771 7.25008C18.1146 8.26397 18.3333 9.3473 18.3333 10.5001C18.3333 11.6529 18.1146 12.7362 17.6771 13.7501C17.2396 14.764 16.6458 15.6459 15.8958 16.3959C15.1458 17.1459 14.2639 17.7397 13.25 18.1772C12.2361 18.6147 11.1528 18.8334 9.99999 18.8334ZM9.99999 17.5834C11.9774 17.5834 13.6523 16.8972 15.0247 15.5248C16.3971 14.1524 17.0833 12.4775 17.0833 10.5001C17.0833 9.65755 16.9375 8.84623 16.6458 8.0661C16.3542 7.28598 15.9444 6.57647 15.4167 5.93758L5.43749 15.9167C6.06249 16.4584 6.7673 16.8716 7.55193 17.1563C8.33657 17.4411 9.15259 17.5834 9.99999 17.5834ZM4.60416 15.0626L14.5625 5.10425C13.9236 4.56258 13.2141 4.14591 12.434 3.85425C11.6538 3.56258 10.8425 3.41675 9.99999 3.41675C8.02256 3.41675 6.34764 4.10294 4.97524 5.47533C3.60285 6.84773 2.91666 8.52265 2.91666 10.5001C2.91666 11.3475 3.06943 12.1635 3.37499 12.9481C3.68055 13.7328 4.09027 14.4376 4.60416 15.0626Z" fill="#F54336"></path>
                </svg>Make Void
              </a>
            </div>
          </div>
        </td>
      </tr>`;
  });
  $(integraion.data.orderTable).find("tbody").html(html);
  $(integraion.data.orderTable).show();
  $(integraion.data.table_preloader).hide();
  let ordersTABLE = $("#example5").DataTable({
    searching: true,
    paging: true,
    select: false,
    info: true,
    lengthChange: false,
    pageLength: 5,
    sPaginationType: "full_numbers",
    language: {
      paginate: {
        next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',
        previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
      },
    },
  });

  $("#orderTAbleSearch").on("keyup", function () {
    ordersTABLE.search($(this).val()).draw();
  });
};
integraion.checkCurrentPage = function (name) {
  if (window.location.pathname == name) return true;
  else return false;
};

integraion.getQueryParam = function (key) {
  const queryParamsString = window.location.search.slice(1); // Remove the leading '?'
  const queryParams = {};

  queryParamsString.split("&").forEach((param) => {
    const [paramKey, paramValue] = param.split("=");
    queryParams[decodeURIComponent(paramKey)] = decodeURIComponent(paramValue);
  });

  return queryParams[key] || null; // Return the value or null if not found
};

integraion.getOrderDetails = function () {
  //Getting current Order ID;
  const orderId = integraion.getQueryParam("order_id");
  setTimeout(async () => {
    data = await integraion.get("orderDetails");
    integraion.renderOrderDetails(data, orderId); // passing order id static 1
  }, 1000);
};
integraion.renderOrderDetails = function (data, order_id) {
  let orderITEM = data.filter((item) => item.id == order_id);
  orderITEM.length > 0
    ? (integraion.data.orderItemDetails = orderITEM[0])
    : null;
  integraion.updateOrderDetailsPageHTML();
};
integraion.updateOrderDetailsPageHTML = function () {
  console.log("FF", integraion.data.orderItemDetails);
  integraion.showOderDetailsPage(true);
  let {
    id,
    created_at,
    ManagementProduct,
    payment_status,
    user,
    products,
    shipping_charge,
    total_payable_amount,
    discount,
    tax,
    subtotal,
    shipping_info,
  } = integraion.data.orderItemDetails;

  const formatted = integraion.formatTimestamp(created_at);

  $(integraion.data.orderDetailsWrap).find(".hambOrderID").html(`#${id}`);
  $(integraion.data.orderDetailsWrap)
    .find(".IDNumber")
    .html(`Order ID : #${id}`);
  $(integraion.data.orderDetailsWrap).find(".IDDATE").html(`${formatted}`);
  $(integraion.data.orderDetailsWrap)
    .find(".SellerID span")
    .html(`#${ManagementProduct.seller_id}`);

  //order status
  $(integraion.data.orderDetailsWrap)
    .find(".orderStatusBTN a")
    .addClass(
      integraion.getOrderStatus(integraion.data.orderItemDetails).className
    )
    .html(integraion.getOrderStatus(integraion.data.orderItemDetails).name);
  $(integraion.data.orderDetailsWrap)
    .find(".paymentStatusBTN a")
    .addClass(
      `${
        payment_status.charAt(0).toUpperCase() + payment_status.slice(1)
      }_btn_color`
    )
    .html(payment_status);

  // CustomerDetails
  $(integraion.data.orderDetailsWrap)
    .find(".customerName")
    .html(user.full_name);
  $(integraion.data.orderDetailsWrap)
    .find(".customerEmail")
    .html(user.email)
    .attr("href", `mailto:${user.email}`);
  $(integraion.data.orderDetailsWrap)
    .find(".customerMobile")
    .html(user.phone)
    .attr("href", `tel:${user.phone}`);

  // Customer Location
  $(integraion.data.orderDetailsWrap)
    .find(".userLocation")
    .html(`Location: <b>${user.location.address}</b>`);
  $(integraion.data.orderDetailsWrap)
    .find(".userAddress")
    .html(`IP Address: <b>${user.location.ip}</b>`);

  // FraudAnalysispopup
  $(".FraudAnalysispopup .dataHolder").html(`
  <li>This order was placed from IP Address: ${user.location.ip}</li>
  <li>The IP Score is - ${user.location.ip_score}</li>
  <li>There was ${user.location.payment_attempts} payment attempts</li>
  <li>Location of IP address used to place order is ${
    user.location.address
  }</li>
  <li>
    Billing country ${
      user.location.isBillingCountryMatched ? "matches" : "not matches"
    } the country from which the order was placed
  </li>`);

  // ORDER PRODUCTS
  let products_HTML = "";
  products.map((item, index) => {
    let product_item = `
      <div class="OrderTablebodyLoop">
        <div class="OrderTablebodyCol1">
          <div class="productWrap">
            <div class="ProductImage">
              <img src="${item.image}" alt="${item.product_name}" />
            </div>
            <div class="ProductDetails">
              <h5>${item.product_name}</h5>
              <span>Color: Red</span>
              <span>$${item.price}</span>
              <span>SKU: ${item.sku}</span>
            </div>
          </div>
        </div>
        <div class="OrderTablebodyCol2">
          <span class="Quantity">${item.qty}</span>
          <span class="AvaliableStock">Avaliable Stock: ${
            item.available_stock
          }</span>
        </div>
        <div class="OrderTablebodyCol3">
          <span class="amount">$${item.price.toFixed(2)}</span>
        </div>
    </div>`;
    products_HTML += product_item;
  });
  $(integraion.data.orderDetailsWrap)
    .find(".OrderTablebody")
    .html(products_HTML);

  $(integraion.data.orderDetailsWrap)
    .find(".subtotal_col .brakeamount")
    .html("$" + subtotal.toFixed(2));

  $(integraion.data.orderDetailsWrap)
    .find(".shipping_col .brakeamount")
    .html("$" + shipping_charge.toFixed(2));

  $(integraion.data.orderDetailsWrap)
    .find(".discount_col .brakeamount")
    .html("$" + discount.toFixed(2));

  $(integraion.data.orderDetailsWrap)
    .find(".tax_col .brakeamount")
    .html("$" + tax.toFixed(2));

  $(integraion.data.orderDetailsWrap)
    .find(".order_total")
    .html("$" + total_payable_amount.toFixed(2));

  // SHIPPING DETAILS

  $(integraion.data.orderDetailsWrap)
    .find(".shipping_name")
    .html(shipping_info.name);

  $(integraion.data.orderDetailsWrap)
    .find(".shipping_delivery")
    .html(shipping_info.est_delivery);

  $(integraion.data.orderDetailsWrap)
    .find(".shipping_price")
    .html("$" + shipping_info.rate.toFixed(2));
};

integraion.showOderDetailsPage = function (type) {
  if (type) {
    $(integraion.data.orderDetailsWrap).show();
    $(integraion.data.orderDetailsLoader).hide();
  } else {
    $(integraion.data.orderDetailsWrap).hide();
    $(integraion.data.orderDetailsLoader).show();
  }
};

integraion.init = async function () {
  //Render all orders list
  if (integraion.checkCurrentPage("/html/Admin/WithJs/order.html")) {
    $(integraion.data.orderTable).hide();
    integraion.allOrders();
  }
  // Order Details
  if (integraion.checkCurrentPage("/html/Admin/WithJs/OrderStatusPending.html")) {
    $(integraion.data.orderDetailsWrap).hide();
    integraion.getOrderDetails();
  }
};

$(integraion.init);
