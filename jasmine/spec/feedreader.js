/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */


		it('url is not empty', function() {
			allFeeds.map(feed => expect(feed.url.length).not.toBe(0));
		});


		/* Test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */


		it('name is not empty', function() {
			allFeeds.map(feed => expect(feed.name.length).not.toBe(0));
		});

	});

	/* Test suite named "The menu" */
	describe('The menu', function() {

		var body = $('body');

		/* Test that ensures the menu element is
		 * hidden by default. We analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 */
		it('is hidden by default', function() {
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

		/* Test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * has two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('toggles state when clicked', function() {
			var menu_icon = $('.menu-icon-link');

			menu_icon.click();
			expect(body.hasClass('menu-hidden')).toBe(false);

			menu_icon.click();
			expect(body.hasClass('menu-hidden')).toBe(true);
		});

	});

	/* Test suite named "Initial Entries" */
	describe('Initial Entries', function() {

		beforeEach(function (done) {
			loadFeed(0, function(){
				done();
			});
		});

		/* Test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * This test will use Jasmine's beforeEach and
		 * asynchronous done() function.
		 */

		it('has atleast one entry', function(){
			var entries = $('.feed').has('.entry').length;
			expect(entries).toBeGreaterThan(10);
		});

	});


	/* Test suite named "New Feed Selection" */

	describe('New Feed Selection', function() {

		var freshFeed;

		beforeEach(function(done) {
			loadFeed(0, function() {
				freshFeed = $('.feed').html();
				loadFeed(1, done);
			});
		});

		/* Test that ensures when a new feed is loaded, the content actually changes.*/

		it('actually changes the content', function(){
			var defaultFeed = $('.feed').html();
			expect(defaultFeed).not.toEqual(freshFeed);
		});

	});

}());
