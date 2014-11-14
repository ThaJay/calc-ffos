window.onload = function () {

        //Eerst normale variabelen, daarna de formules.
    var ans         = document.getElementById("antwoord"),
        is          = document.getElementById("is"),
        reset       = document.getElementById("c"),
        nummer      = document.querySelectorAll(".numberBtn"),
        operator    = document.querySelectorAll(".operatorBtn"),
        calcField   = "0",
        isPressed   = false,

            //Een event listener per knopje
        knop = function (input, aReset) {
            for (var i = 0; i < input.length; i++) {
                input[i].addEventListener('click', function () {
                    toField(this.textContent, aReset);
                });
            };
        },

            //Naar het tekstveld!
        toField = function (input, autoReset)
        {
            if (calcField === "0")
            {
                calcField = "";
            }
            else if (autoReset && isPressed)
            {
                rst();
                calcField = "";
            };
            // Boolean(calcField.match(/e/))
            if (isPressed && calcField != "")
            {
                calcField = "(" + calcField + ")";
            };
            calcField += input;
            ans.textContent = calcField;
            isPressed = false;
        },

             //Reset
        rst = function ()
        {
            calcField = "0";
            ans.textContent = calcField;
        },

            //Validatie en dan rekenen
        calculate = function ()
        {
            calcField = calcField.replace(/[.]{2,}/g, ".");

            if (
		        Boolean(calcField[0].match(/[*/]/g)) |
		        Boolean(calcField.match(/[+\-/*]{2,}/g)) |
		        Boolean(calcField.match(/[+\-/*][.]+[+\-/*]/g))
		        ) {
                ans.textContent="invalid";
                isPressed = true;
            }

            else
            {
                //calcField.replace(/^[^0-9+\-*/().]*$/, "");
                calcField = eval(calcField)
                if (parseFloat(calcField) > 999999 | parseFloat(calcField) < 0.000001)
                {
                    calcField = calcField.toPrecision(4);
                }
                else
                {
                    Math.round(calcField * 1e3) / 1e3;
                }
                ans.textContent = calcField;
                isPressed = true;
            };
        };

    
    //GAAN WE DAN
    //Heuuu!!
    knop(nummer, true);

    knop(operator, false);
    
    is.addEventListener('click', function ()
    {
        calculate();
    });

    reset.addEventListener('click', function ()
    {
        rst();
    });

};
