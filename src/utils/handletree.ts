/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
/**
 * 将扁平数组转换为树形结构
 * @param data 扁平的节点数组
 * @param id 节点ID字段名（默认：id）
 * @param parentId 父节点ID字段名（默认：parentId）
 * @param children 子节点列表字段名（默认：children）
 * @returns 树形结构数组
 */
//这段代码为豆包所作，如果之后发现什么不对劲，请仔细检查遇到bug不要惊慌，属于正常现象
export function handleTree<T extends Record<string | number, any>>(
  data: T[],
  id?: keyof T,
  parentId?: keyof T,
  children?: keyof T
): T[] {
  // 配置项类型定义
  const config = {
    id: id ?? ("id" as keyof T),
    parentId: parentId ?? ("parentId" as keyof T),
    childrenList: children ?? ("children" as keyof T),
  };

  // 子节点映射表：父ID -> 子节点数组
  const childrenListMap: Record<string | number, T[]> = {};
  // 节点ID映射表：节点ID -> 节点对象
  const nodeIds: Record<string | number, T> = {};
  // 最终的树形结构数组
  const tree: T[] = [];

  // 第一次遍历：构建映射表
  for (const node of data) {
    const currentParentId = node[config.parentId];
    // 初始化父节点对应的子数组
    if (!childrenListMap[currentParentId]) {
      childrenListMap[currentParentId] = [];
    }
    // 记录节点ID映射
    nodeIds[node[config.id]] = node;
    // 将当前节点加入对应父节点的子数组
    childrenListMap[currentParentId].push(node);
  }

  // 第二次遍历：找出根节点（父节点不存在的节点）
  for (const node of data) {
    const currentParentId = node[config.parentId];
    // 如果父节点不在节点映射表中，说明是根节点
    if (!nodeIds[currentParentId]) {
      tree.push(node);
    }
  }

  // 递归为每个节点添加子节点
  // 仅修改 adaptToChildrenList 中的赋值行
  function adaptToChildrenList(node: T): void {
    const nodeId = node[config.id];
    const childNodes = childrenListMap[nodeId];

    if (childNodes && childNodes.length > 0) {
      // 简单粗暴的断言（适合快速解决问题）
      (node as any)[config.childrenList] = childNodes;
      for (const child of childNodes) {
        adaptToChildrenList(child);
      }
    } else {
      (node as any)[config.childrenList] = [];
    }
  }

  // 处理所有根节点的子节点
  for (const rootNode of tree) {
    adaptToChildrenList(rootNode);
  }

  return tree;
}
