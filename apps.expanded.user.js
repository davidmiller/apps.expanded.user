// Google Apps expanded
// version 0.1
// 2009-09-03
//
// --------------------------------------------------------------------
//
// This Greasemonkey script 'adds' Google Reader to Google Apps by
// placing a link in the top left navigation, and makes your apps 
// mail account the target of the 'mail' link in the Google Reader
// gbar
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Apps Expanded
// @description   Expands Google apps to include Google Reader
// @include       *google*
// ==/UserScript==

// EDIT: User vars
var domain = 'deadpansincerity.com';

// Set our global vars
var url = String( window.location );
var locations = {
                 'gmail': 'http://mail.google.com/a/'
                 }

// Gmail functions
if ( url.substr( 0, 24 ) == 'http://mail.google.com/a' ) 
{
    window.addEventListener( 'load', function() 
    {
        if ( unsafeWindow.gmonkey ) 
        {
            unsafeWindow.gmonkey.load( '1.0', function( gmail ) 
            {
                var masthead = gmail.getMastheadElement();
                var link = document.createElement( 'a' );
                link.innerHTML = '<a class="gb1 qq" target="_blank" href="http://www.google.com/reader/view/?tab=my">Reader</a>';
                mastheadDivs = masthead.getElementsByTagName( "div" );
                for ( var i = 0; i < mastheadDivs.length; i++ )
                {
                    if( mastheadDivs[i].id == 'gbar' )
                    {
                        var gbar = mastheadDivs[i];
                        break;
                    }
                }
                gbar.appendChild( link );
            });
        }
    }, true );
}

// Google Reader functions
if ( url.substr( 0, 28 ) == 'http://www.google.com/reader' )
{
    var gbar = document.getElementById( 'gbar' );
    var links = gbar.childNodes[0].getElementsByTagName( 'a' );
    for ( var j = 0; j < links.length; j++ )
    {
        if ( links[j].href.substr( 0, 22 ) == 'http://mail.google.com' )
        {
            links[j].href = locations.gmail + domain + '/#inbox';
            break;
        }
    }
}
