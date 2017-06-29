$(function() {
    // Initialize copy button
    var clipboard = new Clipboard('#copyOrderContentBtn');

    clipboard.on('success', function (e) {
        setTooltip(e.trigger, 'Copied!');
        hideTooltip(e.trigger);
    });

    clipboard.on('error', function (e) {
        setTooltip(e.trigger, 'Failed!');
        hideTooltip(e.trigger);
    });
    // Tooltip

    $('#copyOrderContentBtn').tooltip({
        trigger: 'click',
        placement: 'bottom'
    });

    function setTooltip(btn, message) {
        $(btn).tooltip('hide')
            .attr('data-original-title', message)
            .tooltip('show');
    }

    function hideTooltip(btn) {
        setTimeout(function () {
            $(btn).tooltip('hide');
        }, 1000);
    }
});

function calculateTotalBillWithoutShippingCost(bill) {
    var products = getProductsArrayFromBill(bill);
    var subtotal = 0;
    for (var i = 0; i < products.length; i++) {
        subtotal += products[i].subtotal;
    }
    subtotal = applyDiscountOnTotal(subtotal, bill.discountPercent);
    subtotal = roundDownToThousand(subtotal);
    return subtotal;
}

function calculateTotalBill(bill) {
    return calculateTotalBillWithoutShippingCost(bill) + calculateShippingCost(bill);
}

function roundDownToThousand(value){
    return Math.floor(value/1000)*1000;
}

function applyDiscountOnTotal(subtotal, discountPercent) {
    if(discountPercent){
        return subtotal * (1 - (discountPercent / 100));
    }
    return subtotal;
}


//using array for displaying purpose. Let's see if array or object works better to be the data model in db
function getProductsArrayFromBill(b) {
    var products = b.products;
    var productArr = $.map(products, function (val, key) {
        if (key.substr(key.length - 3, key.length) == "Amt") {
            return {name: key, amount: val};
        }
    });
    productArr.forEach(function (p) {
        var key = p.name.substr(0, p.name.length - 3);
        p.price = products[key + "Price"];
        p.subtotal = p.amount * p.price;
    });
    return productArr;
}

function calculateShippingCost(bill) {
    var province = bill.info.province;
    var shippingCost = 0;
    var weight = calculateWeight(bill);
    console.log("Weight is " + weight);
    if(bill.info.paymentType === "bank-transfer"){
        return 0;
    }
    if (province === "TP HCM") {
        if (weight < 200) {
            shippingCost = 20000;
        }
    } else {
        if (weight < 300) {
            if (groupA(province)) {
                weight <= 300 ? shippingCost = 30000 : (weight <= 500 ? shippingCost = 40000 : (weight <= 1000 ? shippingCost = 50000 : (weight <= 1500 ? shippingCost = 65000 : (weight <= 2000 ? shippingCost = 75000 : shippingCost = addShippingCostAtExceedPrice(weight, 75000)))));
            } else if (groupB(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 55000 : (weight <= 1500 ? shippingCost = 70000 : (weight <= 2000 ? shippingCost = 80000 : shippingCost = addShippingCostAtExceedPrice(weight, 80000)))));
            } else if (groupC(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 55000 : (weight <= 1500 ? shippingCost = 70000 : (weight <= 2000 ? shippingCost = 80000 : shippingCost = addShippingCostAtExceedPrice(weight, 80000)))));
            } else if (groupD(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 60000 : (weight <= 1500 ? shippingCost = 75000 : (weight <= 2000 ? shippingCost = 85000 : shippingCost = addShippingCostAtExceedPrice(weight, 85000)))));
            } else if (groupE(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 60000 : (weight <= 1500 ? shippingCost = 75000 : (weight <= 2000 ? shippingCost = 85000 : shippingCost = addShippingCostAtExceedPrice(weight, 85000)))));
            } else {
                weight <= 300 ? shippingCost = 40000 : (weight <= 500 ? shippingCost = 50000 : (weight <= 1000 ? shippingCost = 65000 : (weight <= 1500 ? shippingCost = 80000 : (weight <= 2000 ? shippingCost = 85000 : shippingCost = addShippingCostAtExceedPrice(weight, 85000)))));
            }
        }
    }
    return shippingCost;

    function groupA(province) {
        return province === "Bình Dương" || province === "Đồng Nai" || province === "Tây Ninh" || province === "Bà Rịa - Vũng Tàu";
    }

    function groupB(province) {
        return province === "Bình Phước" || province === "Gia Lai" || province === "Đắk Lắk" || province === "Đắk Nông" || province === "Kon Tum" || province === "Lâm Đồng";
    }

    function groupC(province) {
        return province === "Cần Thơ" || province === "An Giang"
            || province === "Bạc Liêu" || province === "Bến Tre"
            || province === "Cà Mau" || province === "Đồng Tháp"
            || province === "Kiên Giang" || province === "Hậu Giang"
            || province === "Long An" || province === "Sóc Trăng"
            || province === "Trà Vinh" || province === "Tiền Giang"
            || province === "Vĩnh Long";
    }

    function groupD(province) {
        return province === "Hà Nội" || province === "Bắc Ninh" || province === "Vĩnh Phúc" || province === "Hải Phòng" || province === "Phú Thọ";
    }

    function groupE(province) {
        return province === "Đà Nẵng" || province === "Quảng Nam"
            || province === "Bình Định" || province === "Quảng Ngãi"
            || province === "Phú Yên" || province === "Khánh Hòa"
            || province === "Bình Thuận" || province === "Ninh Thuận"
            || province === "Nghệ An" || province === "Thanh Hóa"
            || province === "Quảng Bình" || province === "Hà Tĩnh"
            || province === "Quảng Trị" || province === "Thừa Thiên Huế";
    }

    function addShippingCostAtExceedPrice(weightInGram, lowerTierShippingCost) {
        if (weightInGram > 2000) {
            var exceedWeight = weightInGram - 2000;
            var nextTierPriceAddition = 10000;
            var shippingCost = lowerTierShippingCost + (Math.ceil(exceedWeight / 500) * nextTierPriceAddition);
            return shippingCost;
        }
        return lowerTierShippingCost;
    }

    function calculateWeight(bill) {
        var weight = 0;
        var products = bill.products;
        for (var property in products) {
            if (products.hasOwnProperty(property)) {
                if (property.substr(property.length - 3, property.length) == "Amt" && products[property] > 0) {
                    weight += 50 * products[property];
                    if (property.indexOf("100") > 0) {
                        weight += 50 * products[property];
                    }
                }
            }
        }
        return weight;
    }
}