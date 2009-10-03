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


// EDIT THIS: User vars
var domain = 'deadpansincerity.com';
// END EDIT THIS


// Set our global vars
var url = String( window.location );


function appsExpander()
//  Main app expander class
{


    this.locations = {
                      'gmail': 'http://mail.google.com/a/',
                      'calendar': 'http://www.google.com/calendar/hosted/',
                      'docs': ''
                      }


    this.gmail = function()
    // Loads the gmail greasemonkey api and inserts a Google Reader link
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
        return true;
    }


    this.google_calendar = function()
    //  Inserts a Google Reader link into the gbar
    {
        var gbar = document.getElementById( 'gbar' );
        var link = document.createElement( 'a' );
        link.innerHTML = '<a class="gb1" target="_blank" href="http://www.google.com/reader/view/?tab=my">Reader</a>';
        gbar.appendChild( link );
        return true;
    }


    this.google_reader = function()
    //  Changes the target locations of the gmail and Google Calendar links
    //  in the gbar
    {
        var gbar = document.getElementById( 'gbar' );
        var links = gbar.childNodes[0].getElementsByTagName( 'a' );
        for ( var j = 0; j < links.length; j++ )
        {
            if ( links[j].href.substr( 0, 22 ) == 'http://mail.google.com' )
            {
                links[j].href = this.locations.gmail + domain + '/#inbox';
            }
            else if ( links[j].href.substr( 0, 30 ) == 'http://www.google.com/calendar' )
            {
                links[j].href = this.locations.calendar + domain; + '/render?tab=mc'
            }
        }
        return true;
    }


    this.dispatch = function()
    // Dynamic dispatcher function based on URL
    {
        if ( url.substr( 0, 24 ) == 'http://mail.google.com/a' ) 
        {
            this.gmail();
        }
        else if ( url.substr( 0, 28 ) == 'http://www.google.com/reader' )
        {
            this.google_reader();
        }
        else if ( url.substr( 0, 30 ) == 'http://www.google.com/calendar' )
        {
            this.google_calendar();
        }
        return true;
    }
    

    this.dispatch();

}

// Initialises the appsExpander object
var appsExpander = new appsExpander()
