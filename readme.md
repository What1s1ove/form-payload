# form-payload

[![](https://github.com/what1s1ove/form-payload/workflows/Lint/badge.svg)](https://github.com/What1s1ove/form-payload/actions?query=workflow%3ALint)
[![](https://github.com/what1s1ove/form-payload/workflows/Test/badge.svg)](https://github.com/What1s1ove/form-payload/actions?query=workflow%3ATest)
[![](https://github.com/what1s1ove/form-payload/workflows/Publish/badge.svg)](https://github.com/What1s1ove/form-payload/actions?query=workflow%3APublish)

Gets form-payload (or payload for a named form field) - via `form.elements`.

## Install

```
npm install form-payload
```

## Usage

```html
<!-- index.html -->
<form name="general">
  <label>
    Name
    <input type="text" name="name" value="Jon">
  </label>
  <label>
    Birthday
    <input type="date" name="birthday" value="2021-03-27">
  </label>
  <label>
    Friends Count
    <input type="number" name="friendsCount" value="1">
  </label>
  <fieldset name="friend">
    <legend>Friend</legend>
    <label>
      Friend Name
      <input type="test" name="friendName" value="Kate">
    </label>
  </fieldset>
  <button type="submit">Submit</button>
</form>

...

<form name="mailing">
  <label>
    Mailing
    <input type="email" name="mail" name="example@mail.com">
  </label>
</form>
```

```js
// index.js
import { getFormValues, getControlValue } from 'form-payload';

const { general: generalFormNode, mailing: mailingFormNode } = document.forms;

generalFormNode.addEventListener('submit', (evt) => {
  evt.preventDefault();

  console.log(getFormValues(generalFormNode));
  // {
  //   name: 'Jon',
  //   birthday: Sat Mar 27 2021 18:06:42 GMT+0200 (Eastern European Standard Time),
  //   friendsCount: 1,
  //   friend: {
  //     friendName: 'Kate',
  //   },
  // }
});

mailingFormNode.addEventListener('change', (evt) => {
  console.log(getControlValue(evt.target));
  // 'example@mail.com'
});

```

## With Frameworks

*It doesn't matter which framework you use, you just need to pass the valid [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement).*

### React

```jsx
import { getFormValues, getControlValue, ControlType } from 'form-payload';

const SimpleForm = () => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log(getFormValues(evt.target as HTMLFormElement));
    // {
    //   name: 'Jon',
    //   birthday: Sat Mar 27 2021 18:06:42 GMT+0200 (Eastern European Standard Time),
    // }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(getControlValue(evt.target));
    // 'example@mail.com'
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" type={ControlType.TEXT} defaultValue="Jon" />
        </label>
        <label>
          Date
          <input name="birthday" type={ControlType.DATE} defaultValue="2021-03-27" />
        </label>
        <button type="submit">Submit</button>
      </form>

      ...

      <form>
        <label>
          Mailing
          <input name="mail" type={ControlType.EMAIL} onChange={handleChange} />
        </label>
      </form>
    </>
  );
};
```

## MIT Licensed
