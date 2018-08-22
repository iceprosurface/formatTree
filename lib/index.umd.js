(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash')) :
    typeof define === 'function' && define.amd ? define(['lodash'], factory) :
    (global['format-tree'] = factory(global._));
}(this, (function (_) { 'use strict';

    /**
     * formatTree
     * @param {data[]} list input list
     * @param {constructure} struct struct of output data
     * @return {any}
     */
    function formatTree(list, struct) {
        var out = [];
        var groupBy = [];
        if (_.isString(struct.groupBy)) {
            groupBy = [struct.groupBy];
        }
        else if (_.isArray(struct.groupBy)) {
            groupBy = struct.groupBy;
        }
        else if (struct.groupBy) {
            throw new Error('[ParamsError] struct must be <null|undefined|0|string[]|string>,but find: ' + JSON.stringify(struct.groupBy));
        }
        var structData = struct.data;
        if (groupBy.length > 0) {
            var groups = _.values(_.groupBy(list, function (item) { return _.reduce(groupBy, function (pre, now) {
                return pre + _.get(item, now);
            }, ''); }));
            _.forEach(groups, function (group) {
                out.push(deepFormatTree(group, structData));
            });
        }
        else {
            out = formatList(list, struct);
        }
        return out;
    }
    /**
     * formatList
     * @param {data[]} list
     * @param {constructure} struct
     */
    function formatList(list, struct) {
        var structData = struct.data || struct;
        return _.map(list, function (item) {
            return deepObjectBuilder(item, structData);
        });
    }
    /**
     * deepObjectBuilder
     * @desc convert item to specified struct
     * @param {data} item item which you wonder to convert
     * @param {any} struct struct
     * @return {any} output data with specified struct
     */
    function deepObjectBuilder(item, struct) {
        var _out = {};
        _.forEach(struct, function (key, _key) {
            if (_.isString(key)) {
                _out[_key] = _.get(item, key);
            }
            else if (_.isFunction(key)) {
                _out[_key] = key(item, key, _key);
            }
            else {
                _out[_key] = deepObjectBuilder(item, key);
            }
        });
        return _out;
    }
    /**
     * deepFormatTree
     * @param {data[]} group
     * @param {constructure} struct
     * @return {any}
     */
    function deepFormatTree(group, struct) {
        var _out = {};
        _.forEach(group, function (item) {
            _.forEach(struct, function (key, _key) {
                if (_.isString(key)) {
                    _out[_key] = _.get(item, key);
                }
                else if (_.isFunction(key)) {
                    _out[_key] = key(item, key, _key);
                }
                else {
                    _out[_key] = formatTree(group, key);
                }
            });
        });
        return _out;
    }

    return formatTree;

})));
