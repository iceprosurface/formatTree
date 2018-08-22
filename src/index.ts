/// <reference path="./type/common.d.ts"/>
import * as _ from 'lodash'

/**
 * formatTree
 * @param {data[]} list input list
 * @param {constructure} struct struct of output data
 * @return {any}
 */
export function formatTree (list: data[], struct: constructure): any {
    let out:any[] = []
    let groupBy: string[] = []
    if (_.isString(struct.groupBy)) {
        groupBy = [ struct.groupBy ]
    } else if (_.isArray(struct.groupBy)) {
        groupBy = struct.groupBy
    } else if (struct.groupBy) {
        throw new Error('[ParamsError] struct must be <null|undefined|0|string[]|string>,but find: ' + JSON.stringify(struct.groupBy))
    }
    let structData: constructure = struct.data
    if (groupBy.length > 0) {
        let groups: data[][] = _
            .values(
                _.groupBy(
                    list,
                    (item: data) => _.reduce(groupBy, (
                        pre: string, now: string) => pre + _.get(item, now),
                        ''
                    )
                )
            )
        _.forEach(groups, (group: data[]) => {
            out.push(deepFormatTree(group, structData))
        })
    } else {
        out = formatList(list, struct);
    }
    return out
}
/**
 * formatList
 * @param {data[]} list
 * @param {constructure} struct 
 */
export function formatList (list: data[], struct: constructure): any[] {
    let structData: constructure = struct.data || struct
    return _.map(list, (item:data) => {
        return deepObjectBuilder(item, structData)
    })
}
/**
 * deepObjectBuilder
 * @desc convert item to specified struct
 * @param {data} item item which you wonder to convert
 * @param {any} struct struct
 * @return {any} output data with specified struct
 */
export function deepObjectBuilder (item: data, struct: any): any {
    let _out:any = {};
    _.forEach(struct, (key, _key: string) => {
        if (_.isString(key)) {
            _out[_key] = _.get(item, key)
        } else if (_.isFunction(key)) {
            _out[_key] = key(item, key, _key)

        } else {
            _out[_key] = deepObjectBuilder(item, key)
        }
    });
    return _out
}
/**
 * deepFormatTree
 * @param {data[]} group 
 * @param {constructure} struct 
 * @return {any}
 */
export function deepFormatTree (group:data[],  struct: constructure): any {
    let _out:any = {};
    _.forEach(group, (item:data) => {
        _.forEach(struct, (key: string | Function | constructure, _key: string) => {
            if (_.isString(key)) {
                _out[_key] = _.get(item, key)
            } else if (_.isFunction(key)) {
                _out[_key] = key(item, key, _key)
            }else {
                _out[_key] = formatTree(group, key)
            }
        })
    })
    return _out
}
