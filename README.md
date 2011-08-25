# Jasmine Tags

* [github.com/tf/jasmine_tags]

A simple hack on top of [Jasmine](https://github.com/pivotal/jasmine)
to add tag annotations to specs and run subsets of all specs.

### Usage

Annotate `describe` blocks with tags:

```javsscript
tag('slow')
describe('some heavy lifiting your might want to skip some times', function() {

});
```

Use multiple tags:

```javsscript
tag('focus', 'acceptance')
describe('some heavy lifiting your might want to skip some times', function() {

});
```

Appending a query string parameter to your test runner site filters specs by tags:

```
?tags=focus        # Run only specs with tag focus
?tags=!slow        # Run only specs which are not tagged with slow
?tags=focus,!slow  # Run only focus specs which are not slow
```

Maybe one day there will be a glossy interface to select tags in the
spec runner.

### Installation

Just include [`src/jasmine_tags.js`](blob/src/jasmine_tags.js) from
your jasmine spec runner.