import classNames from 'classnames';
import _ from 'lodash';
import { findNodeOfTree } from 'rsuite-utils/lib/utils';
import placementPolyfill from '../utils/placementPolyfill';

export function createConcatChildrenFunction(node: any, nodeValue?: any) {
  return (data: any[], children: any[]): any[] => {
    if (nodeValue) {
      node = findNodeOfTree(data, item => nodeValue === item.value);
    }
    node.children = children;
    return data.concat([]);
  };
}

export function getToggleWrapperClassName(
  name: string,
  prefix: (name: string) => string,
  props: any,
  hasValue: boolean,
  classes?: any
) {
  const { className, placement, appearance, cleanable, block, disabled, countable } = props;

  return classNames(className, prefix(name), prefix(appearance), prefix('toggle-wrapper'), {
    [prefix(`placement-${_.kebabCase(placementPolyfill(placement))}`)]: placement,
    [prefix('block')]: block,
    [prefix('has-value')]: hasValue,
    [prefix('disabled')]: disabled,
    [prefix('cleanable')]: hasValue && cleanable,
    [prefix('countable')]: countable,
    ...classes
  });
}

export function onMenuKeyDown(event: React.KeyboardEvent, events) {
  const { down, up, enter, del, esc } = events;
  switch (event.keyCode) {
    // down
    case 40:
      down && down(event);
      event.preventDefault();
      break;
    // up
    case 38:
      up && up(event);
      event.preventDefault();
      break;
    // enter
    case 13:
      enter && enter(event);
      event.preventDefault();
      break;
    // delete
    case 8:
      del && del(event);
      break;
    // esc | tab
    case 27:
    case 9:
      esc && esc(event);
      event.preventDefault();
      break;
    default:
  }
}
