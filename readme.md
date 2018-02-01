# jQuery.appear

This lightweight (885B, gzipped) jQuery plugin generates custom events that notify when an element becomes visible or hides after a scroll. 

This is a extension of the original jquery.appear plugin by Andrey Sidorov, @morr, (https://github.com/morr/jquery.appear). While the old jQuery.appear does a good job of tracking scrolling on the `document`, this version of jQuery.appear will allow you to provide an optional `container` in which items should be visible in.

When an element becomes visible or not in it's container (the container can either be an elemnt with scrolling or the `document`) jQuery.appear triggers *appear*/*disappear* events on the observed elements. 

##Install

```bash
npm install --save v-appear
```

##Usage

```js
$('.selector').appear(); // It supports optional hash with "force_process" and "interval" keys. Check source code for details.

$('.selector').on('appear', function(event, $all_appeared_elements) {
  // this element is now inside browser viewport
});
$('.selector').on('disappear', function(event, $all_disappeared_elements) {
  // this element is now outside browser viewport
});
```
### Options
|Name|Type|Description|
|:--:|:--:|:----------|
|**`container`**|`{Selector/Element/jQuery Object}`|Default: `document`. The parent for the `element` being observed. jQuery.appear will check whether the element is(n't) visible in the viewport ***and*** in the `container`.  |
|**`forceProcess`**|`{Boolean}`|Default: `false`. Immediately check if the `element` is(n't) visible and fire `appear`/`disappear` events accordingly. |
|**`vOffset`**|`{Double}`|Default: `0`. Number of pixels from the viewport _vertical_ edge the `element` can be found before triggering the `appear` event |
|**`hOffset`**|`{Double}`|Default: `0`. Number of pixels from the viewport _horizontal_ edge the `element` can be found before triggering the `appear` event |

Also this plugin provides custom jQuery filter to check if an element is(n't) visisble.

```js
$('.selector').is(':appeared')
```