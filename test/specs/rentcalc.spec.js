import Page from './page'
var assert = require('assert');
describe('sparkasse.de/service/rechner/mietrechner', function(){  //depenendency to interest input and starting rent value

    it('should calculate the right interest rate and total sum for the next 40: value 100/1,7', function(){
        var pageobj = new Page("100","1,7")

        pageobj.open();
        pageobj.rentInput.setValue(pageobj.rent)
        pageobj.interestInput.setValue(pageobj.interest)
    
        pageobj.rentInput.scrollIntoView();
        browser.executeAsync(function (done){
            setTimeout(done, 1000)
        })
        var calcResults = pageobj.calcExpected(pageobj.rentInput.getValue(), pageobj.interestInput.getValue());

        pageobj.submit();
  
        // ASSERT
        var rentValuesFromSite = pageobj.getTableVals(pageobj.rentCol)
        var totalValuesFromSite = pageobj.getTableVals(pageobj.sumCol)
        assert.equal(rentValuesFromSite, calcResults.rentCol);
        assert.equal(totalValuesFromSite, calcResults.totalCol);

 
    })



    it('hould calculate the right interest rate and total sum for the next 40 value 600/4,3', function() {    
        let pageobj = new Page("600","4,3")
        
        pageobj.open();
        pageobj.rentInput.setValue(pageobj.rent)
        pageobj.interestInput.setValue(pageobj.interest)
    
        pageobj.rentInput.scrollIntoView();
        browser.executeAsync(function (done){
            setTimeout(done, 1000)
        })
        var calcResults = pageobj.calcExpected(pageobj.rentInput.getValue(), pageobj.interestInput.getValue());

        pageobj.submit();
  
        // ASSERT
        var rentValuesFromSite = pageobj.getTableVals(pageobj.rentCol)
        var totalValuesFromSite = pageobj.getTableVals(pageobj.sumCol)
        assert.equal(rentValuesFromSite, calcResults.rentCol);
        assert.equal(totalValuesFromSite, calcResults.totalCol);

            
  
    })




})


  

