
export default class Page {


    constructor(rent, interest) {
        this.title = 'Mietrechner'
        this.interest = interest
        this.rent = rent
        this.path = "https://www.sparkasse.de/service/rechner/mietrechner.html"
    }


    // getter 
    get submitBtn() { return $('a.calculatorButton') }
    get interestInput() { return $('#mr-mietsteigerung') }
    get rentInput() { return $('#mr-mtl-miete') }
    get rentCol() {
        var rows = [$("#mr-miettabelle > table > tbody > tr:nth-child(1) > td:nth-child(2)"),
        $("#mr-miettabelle > table > tbody > tr:nth-child(2) > td:nth-child(2)"),
        $("#mr-miettabelle > table > tbody > tr:nth-child(3) > td:nth-child(2)"),
        $("#mr-miettabelle > table > tbody > tr:nth-child(4) > td:nth-child(2)")];
        return rows
    }
    get sumCol() {
        var rows = [$("#mr-miettabelle > table > tbody > tr:nth-child(1) > td:nth-child(3)"),
        $("#mr-miettabelle > table > tbody > tr:nth-child(2) > td:nth-child(3)"),
        $("#mr-miettabelle > table > tbody > tr:nth-child(3) > td:nth-child(3)"),
        $("#mr-miettabelle > table > tbody > tr:nth-child(4) > td:nth-child(3)")];
        return rows
    }



    calcExpected(rent, interest) {
        rent = this.formatToNum(rent)
        interest = this.formatToNum(interest)
        var initialrent = rent;
        interest = interest / 100 + 1;
        var total = 0;
        var rentCol = [];
        var totalCol = [];

        for (var i = 1; i < 41; i++) {
            rent = rent * interest;
            
            if (i == 1) {      // assuming one would not consider the ongoing year of payment
                rent = initialrent;
            }
            total = rent * 12 + total;
            
            if (i % 10 == 0) {
                rentCol.push(rent)
                totalCol.push(total)

                if (i % 40 == 0) {
                    break;
                }
            }
        }
        return {
            rentCol,
            totalCol
        }

    }
    open() {
        browser.url(this.path)
    }

    submit() {
        this.submitBtn.click()
    }
    getTableVals(elem) {
        var valArr = []
        var that = this;
        elem.forEach(function (val) {
            var result = browser.executeAsync(function (val, done) {
                done(val)
            }, val.getText())
            val = that.formatToNum(result);
            valArr.push(val);
        });
        return valArr
    }

    formatToNum(val) {
        if (typeof (val) == "string") {
            var chars = { ',': '.', '€': '' , ".": ""};
            var regex = /[.,€]/g;
            val = val.replace(regex, m => chars[m]);
        } else {
            return val
        }
        return Number(val)
    }

}