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
                      'docs': 'http://docs.google.com/a/'
    };


    this.gbar_link = function( opts )
    // Inserts a link into the gbar
    {
        if( !opts.gbar )
	{
            opts.gbar = document.getElementById( 'gbar' );
	}
        var link = document.createElement( 'a' );
        link.innerHTML = '<a class="gb1 ' + opts.classes + '" target="_blank" href="' + opts.href + '">' + opts.text + '</a>';
        opts.gbar.appendChild( link );
        return true;
    };


    this.insert_link_reader = function()
    //  inserts a link to Google Reader into the gbar
    {
        if ( this.gbar_link( {
			       href: 'http://www.google.com/reader/view/?tab=my',
	  		       text: 'Reader'
			     } ) )
        {
            return true;
        }
        else
        {
            return false;
        }
    };


    this.insert_link_analytics = function()
    //  Inserts a link to Google Analytics
    {
        if ( this.gbar_link( {
			       href: 'https://www.google.com/analytics/settings/home',
			       text: 'Analytics'
			     } ) )
        {
  	    return true;
        }
        else
	{
  	    return false;
	}
    };


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
                    mastheadDivs = masthead.getElementsByTagName( "div" );
                    for ( var i = 0; i < mastheadDivs.length; i++ )
                    {
                        if( mastheadDivs[i].id == 'gbar' )
                        {
                            var gbar = mastheadDivs[i];
                            break;
                        }
                    }
                    //  Jumping out to global scope as this gets reset by
                    //  the Gmail greasemonkey API
                    appsExpander.gbar_link( {
					      href: 'http://www.google.com/reader/view/?tab=my',
					      text: 'Reader',
					      gbar:  gbar,
					      classes: 'qq'
					    } );
                    appsExpander.gbar_link( {
					      href: 'https://www.google.com/analytics/settings/home',
					      text: 'Analytics',
					      gbar:  gbar,
					      classes: 'qq'
					    } );
                });
            }
        }, true );
        return true;
    };


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
                links[j].href = this.locations.calendar + domain + '/render?tab=mc';
            }
            else if ( links[j].href.substr( 0, 22 ) == 'http://docs.google.com' )
            {
                links[j].href = this.locations.docs + domain + '/?tab=co#all';
            }
        }
        return true;
    };


    this.dispatch = function()
    // Dynamic dispatcher function based on URL
    {
        if ( url.substr( 0, 25 ) == 'http://mail.google.com/a/' )
        {
            this.gmail();
  	    return true;
        }
        else if ( url.substr( 0, 28 ) == 'http://www.google.com/reader' )
        {
            this.google_reader();
  	    return true;
        }
        else if ( url.substr( 0, 37 ) == 'http://www.google.com/calendar/hosted' )
        {
            this.insert_link_reader();
            this.insert_link_analytics();
  	    return true;
        }
        else if ( url.substr( 0, 25 ) == 'http://docs.google.com/a/' )
        {
            this.insert_link_reader();
	    this.insert_link_analytics();
  	    return true;
        }
        else
	{
  	    return false;
	}
    };


    this.dispatch();


}


// Initialises the appsExpander object
var appsExpander = new appsExpander();