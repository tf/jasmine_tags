/*global jasmineTags*/
/*jslint jasmine: true*/

describe('Tag method defined by jasmineTags.setup', function() {
  it('does not filter specs if no tag is given to setup', function() {
    var describeSpy = jasmine.createSpy(),
        target = {
          describe: describeSpy,
          it: jasmine.createSpy()
        };

    jasmineTags.setup(target);

    target.tag('slow');
    target.describe();

    expect(describeSpy).toHaveBeenCalled();
  });

  it('filters specs with excluded tag', function() {
    var describeSpy = jasmine.createSpy(),
        target = {
          describe: describeSpy,
          it: jasmine.createSpy()
        };

    jasmineTags.setup(target, {excluded: ['slow']});

    target.tag('slow');
    target.describe();

    expect(describeSpy).not.toHaveBeenCalled();
  });

  it('does not filter specs in describe adjacent to filtered describe', function() {
    var describeSpy = jasmine.createSpy(),
        target = {
          describe: describeSpy,
          it: jasmine.createSpy()
        };

    jasmineTags.setup(target, {excluded: ['slow']});

    target.tag('slow');
    target.describe('1');
    target.describe('2');

    expect(describeSpy).toHaveBeenCalledWith('2');
  });

  it('does not filter specs whose tag is not among the excluded tags', function() {
    var describeSpy = jasmine.createSpy(),
        target = {
          describe: describeSpy,
          it: jasmine.createSpy()
        };

    jasmineTags.setup(target, {excluded: ['slow']});

    target.tag('other');
    target.describe();

    expect(describeSpy).toHaveBeenCalled();
  });

  it('does not filter specs with included tag', function() {
    var describeSpy = jasmine.createSpy(),
        target = {
          describe: describeSpy,
          it: jasmine.createSpy()
        };

    jasmineTags.setup(target, {included: ['focus']});

    target.tag('focus');
    target.describe();

    expect(describeSpy).toHaveBeenCalled();
  });

  it('filter specs whose tag is not among the included tags', function() {
    var describeSpy = jasmine.createSpy(),
        target = {
          describe: describeSpy,
          it: jasmine.createSpy()
        };

    jasmineTags.setup(target, {included: ['focus']});

    target.tag('other');
    target.describe();

    expect(describeSpy).not.toHaveBeenCalled();
  });

  it('filter specs with included and excluded tags', function() {
    var describeSpy = jasmine.createSpy(),
        target = {
          describe: describeSpy,
          it: jasmine.createSpy()
        };

    jasmineTags.setup(target, {included: ['focus'], excluded: ['slow']});

    target.tags('slow', 'focus');
    target.describe();

    expect(describeSpy).not.toHaveBeenCalled();
  });
});