# Jasmine Tags

* [github.com/tf/jasmine_tags](http://github.com/tf/jasmine_tags)

A simple hack on top of [Jasmine](https://github.com/pivotal/jasmine)
to add tag annotations to specs and run subsets of all specs.

### Usage

Annotate `describe` and `it` blocks with tags:

```javsscript
tag('slow');
describe('some heavy lifiting your might want to skip some times', function() {
  tag('important');
  it('is very important', function() {
    ...
  });
});
```

Use multiple tags:

```javsscript
tags('focus', 'acceptance');
describe('some acceptance specs you are currently working on', function() {
  ...
});
```

Appending a query string parameter to your test runner filters specs by tags:

```
?tags=focus        # Run only specs with tag focus
?tags=!slow        # Run only specs which are not tagged with slow
?tags=focus,!slow  # Run only focus specs which are not slow
```

Maybe one day there will be a glossy interface to select tags in the
spec runner.

### Installation

Just link `src/jasmine_tags.js` from your jasmine spec runner.

### License

Please fork and improve.

Copyright (c) 2011 Tim Fischbach. This software is licensed under the MIT License.