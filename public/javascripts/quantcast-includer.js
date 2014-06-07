CloudFlare.define( 'quantcast', [ 'quantcast/config' ], function( config )
{
    'use strict';
    /**
     * Get PCode
     */
    var pCode = config.pCode;

    var doc = document,
        body = doc.body,
        head = doc.getElementsByTagName( 'head' )[ 0 ],

        /**
         * Quant js script
         */
        quantJsDom = doc.createElement('script'),
        quantJs = "var _qevents = _qevents || [];" +
        "(function() {" +
            "var elem = document.createElement('script');" +
            "elem.src = (document.location.protocol == \"https:\" ? \"https://secure\" : \"http://edge\")" +
                "+ \".quantserve.com/quant.js\";" +
            "elem.async = true;" +
            "elem.type = \"text/javascript\";" +
            "var scpt = document.getElementsByTagName('script')[0];" +
            "scpt.parentNode.insertBefore(elem, scpt);" +
        "})();" +
        "_qevents.push( { qacct:\"" + pCode + "\"} );",

        /**
         * No script dom elements
         */
        noScriptQuantJs = doc.createElement('noscript'),
        noScriptDiv = doc.createElement('div'),
        noScriptImg = doc.createElement('img')
        ;

    quantJsDom.type= 'text/javascript';
    quantJsDom.appendChild(doc.createTextNode(quantJs));

    noScriptImg.width = 1;
    noScriptImg.height = 1;
    noScriptImg.alt = 'quantcast';
    noScriptImg.src = '//pixel.quantserve.com/pixel/' + pCode + '.gif';

    noScriptDiv.style.display = 'none';
    noScriptDiv.appendChild(noScriptImg);

    noScriptQuantJs.appendChild(noScriptDiv);

    head.insertBefore( quantJsDom, head.firstChild );

    /**
     * Injects the noscript tag into the body
     */
    body.appendChild( noScriptQuantJs );
} );