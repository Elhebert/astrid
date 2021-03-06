# Peach

This is Peach, a light **ES6 javascript** module to create sticky elements.

> Morning. It's morning, everyone! Today's the day! The sun is shining, the tank is clean, and we are gonna get out of... 

![peach](https://media.giphy.com/media/ulSIu5DqlV51C/giphy.gif)

Special thanks to [Grafikart](https://github.com/grafikart). This script is an ES6 adaption of his tutorial about [sticky elements](https://www.grafikart.fr/formations/debuter-javascript/menu-collant).

## Usage

Add the **peach.js** file to your index.(html|php).
```
<script src="/path/to/peach.js"></script>
```

Add `data-sticky` on the html element that need to be sticky. When the element is in sticky mode, it'll have the css class `sticky`.
You can thus, customize it.


## Options

### Offset
Add an offset to the element.

The offset will define the distance (in pixel) between the top of the page and the element.

Usage:
```
<my-element data-offset="50"></my-element>
```

### Constraint
Add a constraint to the element.

The constraint will define within which element (using the css class) the sticky one will be constriced. It won't be able to go further that element.

Usage:
```
<my-parent-element class="constraint-element">
	<my-element data-sticky data-constraint=".constraint-element"></my-element>
</my-parent-element>
```

## License
This script is published under the [MIT license](./LICENSE)
