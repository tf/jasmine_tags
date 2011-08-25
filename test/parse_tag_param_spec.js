/*global jasmineTags*/
/*jslint jasmine: true*/

describe('jasmineTags.parseTagParam', function() {
  it('returns empty arrays of included and excluded tags for empty string', function() {
    var tags = jasmineTags.parseTagParam('');

    expect(tags.included).toEqual([]);
    expect(tags.excluded).toEqual([]);
  });

  it('returns empty arrays of included and excluded tags for param with empty value', function() {
    var tags = jasmineTags.parseTagParam('tags=');

    expect(tags.included).toEqual([]);
    expect(tags.excluded).toEqual([]);
  });

  it('returns array of included tags for comma separated string of tag names', function() {
    var tags = jasmineTags.parseTagParam('tags=focus,fast');

    expect(tags.included).toEqual(['focus', 'fast']);
    expect(tags.excluded).toEqual([]);
  });

  it('returns array of excluded tags for comma separated string of tag names starting with !', function() {
    var tags = jasmineTags.parseTagParam('tags=!focus,!fast');

    expect(tags.included).toEqual([]);
    expect(tags.excluded).toEqual(['focus', 'fast']);
  });

  it('returns arrays of excluded and included tags for comma separated string of tag names', function() {
    var tags = jasmineTags.parseTagParam('tags=!focus,fast');

    expect(tags.included).toEqual(['fast']);
    expect(tags.excluded).toEqual(['focus']);
  });

  it('correctly extracts param value from longer query string', function() {
    var tags = jasmineTags.parseTagParam('?tags=!focus&other=true');

    expect(tags.included).toEqual([]);
    expect(tags.excluded).toEqual(['focus']);
  });
});