//tslint:disable
import React, { useState, useEffect, useContext } from 'react';
import {
    RenderFormElement,
    FormElement,
    PluginRadio,
    PluginInput,
    PluginSelect,
} from '../../generic-form/form-element';
import LinkSvg from './Link.svg';
import { TextDropdown } from 'coding-ui-kit/dropdown';

import { TreeSelectDropdown } from 'coding-ui-kit/tree-select';
import Radio from 'coding-ui-kit/radio2';
import { get } from 'share/request';
import { errorInterceptor } from 'share/module/project/ci/qci-utils';
import { pipielineStore } from '../../../pipeline-store';
import s from '../../generic-form/style.scss';

const RadioGroup = Radio.Group;

interface IQtapTaskUpdateProps {
    allValue: { [key: string]: any };
    findProvenStandardsIndex?: any;
    onChange: (name: string, value: any, isVersionSelet: boolean) => void;
    readonly?: boolean;
    versionArguments: any;
    select?: number;
    languages?: [] | string;
}

// tslint:disable-next-line:cognitive-complexity no-big-function
const qtapTaskUpdate = (props: IQtapTaskUpdateProps) => {
    const [real_qtap_id, setReal_qtap_id] = useState('');

    //@ts-ignore
    // const initial_testcase = JSON.parse(localStorage.getItem('qtap_task_testcase') || '[]');
    // const initial_repoStore = JSON.parse(localStorage.getItem('qtap_task_repoStore') || '[]');
    const { allValue, onChange } = props;
    const [taskList, setTaskList]: any = useState([]);
    const [showPath, setShowPath] = useState(false);
    const [myTaskList, setMyTaskList]: any = useState([]);
    const [repoStorage, setRepoStorage]: any = useState([]);
    const [branches, setBranches]: any = useState([]);
    const [branch, setBranch] = useState('master');
    const [repoCase, setRepoCase]: any = useState([]);
    const [task_select, setTask_select] = useState('all');
    const [offset, setOffset] = useState(10);
    const [expandedKeys, setExpandedKeys]: any = useState([]);
    const [loading, setLoading] = useState(false);
    const {
        state: { userName },
    } = useContext(pipielineStore);
    const project_name = window.location.pathname.split('/')[2];
    useEffect(() => {
        onChange('project', project_name, false);
        return () => {};
    }, []);
    useEffect(() => {
        const fetchTaskList = async () => {
            const response = await fetch(`/api/qta/coding/project/${project_name}/`);
            const real_id = (await response.json()).qtap_project_id;
            // !real_id && clearAllData();
            setReal_qtap_id(real_id);
            const promises = [
                `/api/qta/task/plan/?project_id=${real_id}&limit=10`,
                `/api/qta/task/plan/?project_id=${real_id}&owner=${userName}&limit=90`,
            ];
            const getData = promises.map(
                async (uri) => await get(uri, true).catch(errorInterceptor)
            );
            const [AllTask, MyTask] = await Promise.all(getData);
            const realAllTask = AllTask.results.map((param: any) => ({
                text: param.name,
                value: param.id + '',
                id: param.id + '',
            }));
            const realMyTask = MyTask.results.map((param: any) => ({
                text: param.name,
                value: param.id + '',
                id: param.id + '',
            }));

            setTaskList(realAllTask);

            setMyTaskList(realMyTask);
        };
        fetchTaskList();
        return () => {};
    }, []);
    const testCase = async (id: number) =>
        await get(`/api/qta/testcase/testcasebranch/${id}/testcase/?size=9999`).catch(
            errorInterceptor
        );
    useEffect(() => {
        const getTaskCase = async () => {
            const response = await fetch(`/api/qta/coding/project/${project_name}/`);
            const real_id = (await response.json()).qtap_project_id;
            setReal_qtap_id(real_id);
            // !real_id && clearAllData();

            const taskRepo =
                real_id &&
                (await get(
                    `/api/qta/testcase/testcaserepo/?project_id=${real_id}&limit=90`,
                    true
                ).catch(errorInterceptor));
            const originRepo = taskRepo.results;
            console.log('origin repo', originRepo);

            const mapRepoResult = originRepo.map((each: any) => ({
                label: each.name,
                value: each.url + '/' + branch,
                branches: each.branches,
                id: each.branches.find((t: any) => t.name === branch || 'master').id,
            }));
            console.log(mapRepoResult);
            if (allValue.testrepo) {
                const index = mapRepoResult.findIndex((e: { value: any }) => {
                    const r = allValue.testrepo.split('/');
                    const b = r.findIndex((e) => e.endsWith('.git'));
                    const res = r.slice(0, b + 1).join('/') + '/' + branch;
                    console.log(b);
                    console.log(res, e.value);
                    return allValue.testrepo && e.value === res;
                });
                console.log(index);
                const mapBranchData =
                    mapRepoResult[index] &&
                    mapRepoResult[index].branches.map((e: any) => ({
                        label: e.name,
                        value: e.name,
                        id: e.id,
                    }));
                // console.log(mapBranchData)
                setBranches(mapBranchData);
            } else {
                setBranches([]);
            }

            setRepoStorage(mapRepoResult);
            // localStorage.setItem('qtap_task_repoStore', JSON.stringify(mapRepoResult));
        };
        getTaskCase();

        return () => {};
    }, [allValue.testrepo]);

    useEffect(() => {
        // onChange('artifact', true, false);
        if (allValue.task) onChange('task', allValue.task, false);
        if (allValue.testrepo) onChange('testrepo', allValue.testrepo, false);
        // console.log(allValue.task)
        return () => {};
    }, []);

    const radioOption = [
        {
            label: '使用CI构建产物',
            value: true,
        },
        {
            label: '自定义',
            value: false,
        },
    ];
    const qtapTaskConfig = [
        {
            label: '测试任务',
            help: '选择测试任务',
            name: 'task',
            options: taskList.length > 0 ? taskList : [{ text: '暂无数据', value: '' }],
            placeholder: '请选择',
            required: true,
        },
        {
            name: 'task',
            options: myTaskList.length > 0 ? myTaskList : [{ text: '暂无数据', value: '' }],
            placeholder: '请选择',
        },
        {
            label: '通过率阈值',
            help: '取值范围：0.0-1.0，低于阈值测试失败，留空表示无通过率强制要求',
            name: 'passrate',
            type: 'text',
            required: true,
            placeholder: '取值范围：0.0-1.0，低于阈值测试失败，留空表示无通过率强制要求',
        },
    ];
    const testProduct = [
        {
            label: '被测产品',
            help: '填写该项会覆盖QTA任务中的“被测产品”一项，留空则使用原有配置',
            name: 'artifact',
            widget: 'radio',
            options: radioOption,
        },
        {
            label: '产物提取规则',
            help: '请输入产物需要满足的关键字或正则表达式',
            name: 'product_rule',
            type: 'text',
            widget: 'textarea',
            placeholder: '请输入产物需要满足的关键字或正则表达式规则',
        },
        {
            label: '被测产品路径',
            help: '输入http形式的产品路径，多个链接用分号分割，留空则使用原有配置',
            name: 'product',
            type: 'text',
            placeholder: '输入http形式的产品路径，多个链接用分号分割，留空则使用原有配置',
        },
    ];
    const qtapTaskSecondConfig = [
        {
            label: 'QTA测试项目配置',
            help: '#python code (留空则使用原有配置)',
            name: 'settings',
            placeholder: '测试项目配置 (留空则使用原有配置)',
            type: 'text',
            widget: 'textarea',
        },
        {
            label: 'Python依赖包',
            help:
                '#python code (除了用例代码库中的requirements.txt外，需额外依赖其他库可填写在这里)',
            name: 'requirements',
            type: 'text',
            widget: 'textarea',
            placeholder:
                '#python code(除了用例代码库中的requirements.txt外，需额外依赖其他库可填写在这里)',
        },
        {
            label: '插件输出结果',
            help: '输出结果使用参考文档，文档二字是超链接，跳转到qci插件输出结果怎么使用的文档',
            name: 'status',
            type: 'text',
            placeholder: 'status.json',
        },
    ];
    const handleAllTaskChange = (item: any) => {
        onChange(qtapTaskConfig[0].name, item.value, false);
    };
    const handleMyTaskChange = (item: any) => {
        onChange(qtapTaskConfig[1].name, item.value, false);
    };
    const handleTaskSearch = (text: any, _sourceItems: any) => {
        const searchTask = async () => {
            const url = `/api/qta/task/plan/?project_id=${real_qtap_id}&search=${text}&limit=90`;
            const response = await get(url, true).catch(errorInterceptor);
            const realAllTask = response.results.map((param: any) => ({
                text: param.name,
                value: param.id + '',
                id: param.id + '',
            }));
            setTaskList(realAllTask);
            return realAllTask;
        };
        searchTask();
    };
    const handleOwnTaskSearch = (text: any, _sourceItems: any) => {
        const searchTask = async () => {
            const url = `/api/qta/task/plan/?project_id=${real_qtap_id}&owner=${userName}&search=${text}&limit=90`;
            const response = await get(url, true).catch(errorInterceptor);
            const realMyTask = response.results.map((param: any) => ({
                text: param.name,
                value: param.id + '',
                id: param.id + '',
            }));
            setMyTaskList(realMyTask);
            return realMyTask;
        };
        searchTask();
    };
    // tslint:disable-next-line
    const onCheck = (_items: any, _checkedKeys: any, _info: any) => {
        const p = _info.checkedNodesPositions.filter((e: any) => {
            const arr = ['0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7', '0-8', '0-9'];
            return arr.some((each) => each === e.pos);
        });
        console.log(p);
        if (p && p.length > 0 && _info.halfCheckedKeys && _info.halfCheckedKeys.length === 0) {
            const value = p.map((e: { node: { key: any } }) => e.node.key);
            // setExpandedKeys(value)
            return onChange('testcase', value.join(' '), false);
        }
        // if (!_info.checked) {
        //     return onChange('testcase', _checkedKeys.join(' '), false);
        // }

        const r = _info.node.props.title;
        const halfChecked = _info.halfCheckedKeys;
        const result = halfChecked.join('.') + '.' + r;
        console.log('after filter', result);
        onChange('testcase', (allValue.testcase ? allValue.testcase + ' ' : '') + result, false);
        // onChange('testcase',_checkedKeys.join(' '),false)

        console.log(_items, _checkedKeys, _info);
    };

    const onExpand = (arg: any) => {
        console.log(arg);
        // setExpandedKeys(arg)
        // const asyncGetData = async () => {
        //     const t = repoStorage.find((t: any) => {
        //         // console.log('get case id',t.value,allValue.testrepo)
        //         return t.value === allValue.testrepo;
        //     });
        //     const root = arg.length > 1 ? arg.join('.') : arg.toString();

        //     const res = await get(
        //         `/api/qta/testcase/testcasebranch/${t && t.id}/testpackage/?root=${root}&size=999`
        //     ).catch(errorInterceptor);
        //     setRepoCase(state => {
        //         const data = state.map(({key,title}:any) => {
        //             return{
        //                 key,
        //                 title,
        //                 children: res.map(e=> {
        //                     return{
        //                         key:e.name,
        //                         title:e.name,
        //                         children:[]
        //                     }
        //                 })
        //             }
        //         })

        //         return data;
        //     });

        // };
        // asyncGetData();
    };
    const loadData = (e: any) => {
        console.log(e);

        return new Promise(async (resolve, _reject) => {
            // if (e.props.children) {
            //     resolve();
            //     return;
            // }
            const t = repoStorage.find((t: any) => {
                // console.log('get case id',t.value,allValue.testrepo)
                return t.value === allValue.testrepo;
            });
            await get(
                `/api/qta/testcase/testcasebranch/${t && t.id}/testpackage/?root=${
                    expandedKeys ? expandedKeys.join('.') : e.props.title
                }&size=999`
            ).catch(errorInterceptor);
            // console.log(res);

            // setRepoCase(state => {
            //     const data = state.map(({key,title}:any) => {
            //         return{
            //             key,
            //             title,
            //             children:e.props.expanded && res.map(e=> {
            //                 return{
            //                     key:e.name,
            //                     title:e.name,
            //                     children:[]
            //                 }
            //             })
            //         }
            //     })

            //     return data;
            // });

            resolve();
        });
    };
    const onRemoveCheck = (_keys: string, items: []) => {
        // console.log(keys, items);
        onChange('testcase', items.join(' '), false);
    };
    // const getTestCaseBasedOnRepo = async () => {
    //     if (allValue.testrepo) {
    //         const t = repoStorage.find((t: any) => {
    //             // console.log('get case id',t.value,allValue.testrepo)
    //             return t.value === allValue.testrepo;
    //         });
    //         t && localStorage.setItem('task_id', t.id + '');
    //         const temp = !t && localStorage.getItem('task_id');
    //         const root = await get(
    //             `/api/qta/testcase/testcasebranch/${
    //                 (t && t.id) || temp
    //             }/testpackage/?root=&size=999`
    //         ).catch(errorInterceptor);
    //         const res = await testCase((t && t.id) || temp);
    //         const m = res.results;

    //     }
    // };
    useEffect(() => {
        const loadRootCase = async () => {
            //    if( repoStorage.length == 0 ){
            //    const b = JSON.parse(localStorage.getItem('repostore') || '[]')
            //    return setRepoCase(b)
            //    }
            const t = repoStorage.find((t: any) => {
                // console.log('get case id',t.value,allValue.testrepo)
                return t.value === allValue.testrepo;
            });
            // t && localStorage.setItem('task_id', t.id + '');

            // const id_storage = !t && localStorage.getItem('task_id');
            // const storage:any = localStorage.getItem('repostore')
            // const parsedStorage = JSON.parse(storage || '[]')
            // if(parsedStorage && parsedStorage.length > 0 && t && t.id === id_storage){
            //   return  setRepoCase(parsedStorage);
            // }
            if (!t) {
                return setRepoCase([]);
            }
            const root = await get(
                `/api/qta/testcase/testcasebranch/${t && t.id}/testpackage/?root=&size=999`
            ).catch(errorInterceptor);
            const res = await testCase(t && t.id);
            const m = res.results;

            // const g = await Promise.all(
            //     root.map((e) => ({
            //         key: e.name,
            //         title: e.name,
            //         children: [],
            //     }))
            // );
            // const result = await sd(root, m, uniqBy);
            // localStorage.setItem('repostore',JSON.stringify(result))
            // setRepoCase(result);
        };
        if (allValue && allValue.testrepo) {
            loadRootCase();
        }

        //    getTestCaseBasedOnRepo()
        return () => {};
    }, [allValue.testrepo]);

    //@ts-ignore
    const handleTestRepo = (name: any, value: any) => {
        const k = repoStorage.find((t: any) => t.label === '暂无数据');
        if (k) return () => {};

        const next_branch = 'master';
        allValue.testrepo && setBranch(next_branch);
        const r = value.split('/').slice(0, -1).join('/');
        if (branches && branches.length > 0) {
            onChange(
                name,
                `${r}/${branches[0].value !== 'trunk' ? branches[0].value : 'master'}`,
                false
            );
        } else {
            onChange(name, value, false);
        }

        console.log(allValue.testrepo, value);
        const target = repoStorage.find(
            (t: any) => t.value.split('/').slice(0, -1).join('/') === r
        );
        const result =
            target &&
            target.branches.map((e: any) => ({
                label: e.name,
                value: e.name,
                id: e.id,
            }));

        setBranches(result);
    };
    const handleBranchChange = (_name: any, _value: any) => {
        setBranch(_value);
        const r = allValue.testrepo.split('/').slice(0, -1).join('/');
        console.log('branch change repo url', r, _value);
        onChange('testrepo', `${r}/${_value}`, false);
    };
    const handleArtifact = (name: any, value: any) => {
        if (!allValue.artifact) setShowPath(true);
        onChange(name, value, false);
    };
    const onClear = () => {
        setBranches([]);
        onChange('task', '', false);
    };
    const onScrollChange = async () => {
        setOffset((prev) => prev + 10);
        const response = await get(
            `/api/qta/task/plan/?project_id=${real_qtap_id}&limit=10&offset=${offset}`,
            true
        ).catch(errorInterceptor);
        const realAllTask = response.results.map((param: any) => ({
            text: param.name,
            value: param.id + '',
            id: param.id + '',
        }));
        setTaskList([...taskList, ...realAllTask]);
    };
    const handleTestRepoClear = () => {
        onChange('testrepo', '', false);
        onChange('testcase', '', false);
        setRepoCase([]);
        setBranch('');
    };
    useEffect(() => {
        onChange('testcase', '', false);
        return () => {};
    }, [allValue.testrepo]);
    useEffect(() => {
        if (allValue.testrepo) {
            const r = allValue.testrepo.split('/').slice(-1).join('');
            setBranch(r);
        }
        if (allValue.testcase) {
            onChange('testcase', allValue.testcase, false);
        }
        return () => {};
    }, []);

    return (
        <div>
            {
                <FormElement
                    title={qtapTaskConfig[0].label}
                    explain={qtapTaskConfig[0].help}
                    required={qtapTaskConfig[0].required}
                >
                    <RadioGroup
                        onChange={(e: any) => {
                            onChange('task', '', false);
                            setTask_select(e.target.value);
                        }}
                        value={task_select}
                    >
                        <Radio value={'all'}>所有任务</Radio>
                        <Radio value={'mine'}>我的任务</Radio>
                    </RadioGroup>

                    <div
                        style={{ display: 'flex', marginTop: '10px' }}
                        className={s.defaultWidthSelect}
                    >
                        {task_select === 'all' ? (
                            <TextDropdown
                                // @ts-ignore
                                items={qtapTaskConfig[0].options}
                                value={allValue.task ? allValue.task : ''}
                                searchable={true}
                                onSelect={taskList.length > 0 ? handleAllTaskChange : () => {}}
                                onSearch={handleTaskSearch}
                                placeholder={qtapTaskConfig[0].placeholder}
                                onScrollBottom={onScrollChange}
                                className={s.defaultSelect}
                                clearable={true}
                                onClear={onClear}
                            />
                        ) : (
                            <TextDropdown
                                // @ts-ignore
                                items={qtapTaskConfig[1].options}
                                value={allValue.task ? allValue.task : ''}
                                searchable={true}
                                onSearch={handleOwnTaskSearch}
                                onSelect={myTaskList.length > 0 ? handleMyTaskChange : () => {}}
                                placeholder={qtapTaskConfig[1].placeholder}
                                className={s.defaultSelect}
                                clearable={true}
                                onClear={onClear}
                            />
                        )}
                        {allValue.task && (
                            <a
                                href={`http://tencent.coding.oa.com/p/${project_name}/qta/task/${allValue.task}/info`}
                                className={s.gotoCheckout}
                                style={{ marginTop: '8px' }}
                                target="_blank"
                            >
                                前往查看
                                <img
                                    src={LinkSvg}
                                    style={{ marginLeft: '1px', marginTop: '2px' }}
                                />
                            </a>
                        )}
                    </div>
                </FormElement>
            }
            {qtapTaskConfig.slice(2, 3).map((param) => (
                <RenderFormElement
                    allValue={allValue}
                    // @ts-ignore
                    param={param}
                    onChange={onChange}
                    key={param.name}
                />
            ))}
            <FormElement title="测试用例库" explain="请选择测试用例库，默认为master分支">
                <div className={s.branchContainer}>
                    <PluginSelect
                        onChange={handleTestRepo}
                        name="testrepo"
                        value={allValue.testrepo}
                        options={repoStorage}
                        placeholder="请选择测试用例库"
                        onClear={handleTestRepoClear}
                        clearable={true}
                    />

                    <PluginSelect
                        onChange={handleBranchChange}
                        name="testrepo"
                        value={branch}
                        options={branches || [{ label: 'master', value: 'master' }]}
                        placeholder="请选择分支"
                        className={s.branch}
                    />
                </div>
            </FormElement>
            <FormElement title="测试用例" explain="点击选择测试用例" required={false}>
                <div className={s.treeSelectDropdown}>
                    <TreeSelectDropdown
                        treeSelectProps={{
                            className: '',
                            onCheck,
                            treeData: repoCase,
                            defaultCheckedKeys:
                                (allValue.testcase && allValue.testcase.split(' ')) || [],
                            loadData,
                            onExpand,
                            multiple: true,
                        }}
                        onRemoveCheck={onRemoveCheck}
                        clearable
                        onClearAllSelectedItems={() => {
                            onChange('testcase', '', false);
                        }}
                        style={{ width: '500px' }}
                    />
                </div>
            </FormElement>
            {testProduct.slice(0, 1).map((param) => (
                <FormElement title={param.label} explain={param.help} key={param.name}>
                    <PluginRadio
                        onChange={handleArtifact}
                        // @ts-ignore
                        options={param.options}
                        value={allValue.artifact}
                        name={param.name}
                        key={param.name}
                    />
                </FormElement>
            ))}
            {/* {allValue.artifact &&
                testProduct.slice(1, 2).map((param) => (
                    <FormElement title={param.label} explain={param.help} key={param.name}>
                        <PluginTextarea
                            onChange={onChange}
                            value={allValue.product_rule}
                            name={param.name}
                            // @ts-ignore
                            widget={param.widget}
                            key={param.name}
                        />
                    </FormElement>
                ))} */}

            {!allValue.artifact &&
                showPath &&
                testProduct.slice(2, 3).map((param) => (
                    <FormElement
                        title={param.label}
                        explain={param.help}
                        key={param.name}
                        className={s.productInput}
                    >
                        <PluginInput
                            onChange={onChange}
                            value={allValue.product}
                            name={param.name}
                            placeholder={param.placeholder}
                            className={s.productInputItem}
                        />
                    </FormElement>
                ))}

            {qtapTaskSecondConfig.map((param) => (
                <RenderFormElement
                    allValue={allValue}
                    onChange={onChange}
                    // @ts-ignore
                    param={param}
                    key={param.name}
                />
            ))}
        </div>
    );
};

export default qtapTaskUpdate;
