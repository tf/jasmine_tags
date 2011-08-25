/**
 * Run only subsets of your Jasmine specs by annotating them with
 * tags.
 *
 * @namespace
 * @author Tim Fischbach - github.com/tf
 */
var jasmineTags = (function() {
  function contains(haystack, needle) {
    return haystack.indexOf(needle) >= 0;
  }

  return /** @lends jasmineTags */{
    /**
     * Defines methods `tag` and `tags` on `target`, which can be used
     * to annotate specs with tags.  Furthermore overrides `describe`
     * and `it` on target, to run only specs matching the tags
     * specified in the `tags` parameter.
     *
     * @param {Object} target
     *   Global scope object to define methods on.  This will be
     *   `window` in the browser.  For testing reasons we allow to
     *   inject a mock.
     *
     * @param {Object} tags
     *   Object with two properties `include` and `exclude` which
     *   contain arrays of tag names.
     */
    setup: function(target, tags) {
      tags = tags || {};

      var includedTags = tags.included || [],
          excludedTags = tags.excluded || [],
          nextTags = null,

          // We override `describe` and `it` to simply do nothing if
          // `off` is true.  If there is a list of included tags,
          // do not run un-tagged specs.
          off = includedTags.length > 0;

      // Do not override existing methods
      if (target.tags || target.tag) {
        throw 'jasmineTags: There already are global #tag or #tags methods. ';
      }

      // Function to determine whether a specific spec should be run
      // based on its tagNames.  If `filtered` returns true, the spec
      // will be skipped.
      function filtered(tagNames) {
        return tagNames.some(function(tagName) {
          return contains(excludedTags, tagName);
        }) || (includedTags.length && !tagNames.some(function(tagName) {
          return contains(includedTags, tagName);
        }));
      }

      // Override `describe` and `it` with functions which look at the
      // arguments last passed to `tag` or `tags` and toggle spec running
      // accordingly.
      ['describe', 'it'].forEach(function(name) {
        var original = target[name];

        target[name] = function() {
          var offBefore = null;

          // Check if there was a call to a `tag` or `tags` method
          // before this spec.
          if (nextTags) {
            offBefore = off;
            off = filtered(nextTags);

            nextTags = null;
          }

          // Optionally call overriden function.
          if (!off) {
            original.apply(target, arguments);
          }

          // Restore value of `off` if it was modified by a `tag` call
          // before this spec.
          if (offBefore !== null) {
            off = offBefore;
          }
        };
      });

      // Define tag annotation methods.
      target.tag = target.tags = function(/* tagNames... */) {
        nextTags = [].slice.call(arguments);
      };
    },

    /**
     * Parses a `location.search` string to generate lists of included
     * and excluded tags.  Tag names starting with an exclamation mark
     * are considered excluded tags.
     *
     * @param {String} search
     *   Query string to parse.
     *
     * @return {Object}
     *   Object with two properties `included` and `excluded`
     *   containing arrays of tag names.
     */
    parseTagParam: function(search) {
      var match = search.match(/tags=([\w,!]*)/),
          tagNames = (match && match[1]) || '',
          result = {
            included: [],
            excluded: []
          };

      tagNames.split(',').forEach(function(tagName) {
        if (tagName.match(/^!\w+$/)) {
          result.excluded.push(tagName.slice(1));
        }
        else if (tagName.match(/^\w+$/)) {
          result.included.push(tagName);
        }
      });

      return result;
    }
  };
}());

// Define and override methods on window.
jasmineTags.setup(window, jasmineTags.parseTagParam(location.search));
