describe("the wait command", function() {

    beforeEach(function () {
        clearWorkArea();
    });
    afterEach(function () {
        clearWorkArea();
    });

    it("can wait on time", function(finished){
        var div = make("<div _='on click " +
            "                             add .foo then " +
            "                             wait 20ms then " +
            "                             add .bar'></div>");
        div.classList.contains("foo").should.equal(false);
        div.classList.contains("bar").should.equal(false);
        div.click();
        div.classList.contains("foo").should.equal(true);
        div.classList.contains("bar").should.equal(false);
        setTimeout(function(){
            div.classList.contains("foo").should.equal(true);
            div.classList.contains("bar").should.equal(true);
            finished();
        }, 30)
    })

    it("can wait on event", function(){
        var div = make("<div _='on click " +
            "                             add .foo then " +
            "                             wait for foo then " +
            "                             add .bar'></div>");
        div.classList.contains("foo").should.equal(false);
        div.classList.contains("bar").should.equal(false);
        div.click();
        div.classList.contains("foo").should.equal(true);
        div.classList.contains("bar").should.equal(false);
        div.dispatchEvent(new CustomEvent("foo"));
        div.classList.contains("foo").should.equal(true);
        div.classList.contains("bar").should.equal(true);
    })

});

