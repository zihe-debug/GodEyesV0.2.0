import json

def deduplicate_fingerprints(input_file, output_file):
    # 读取指纹文件
    with open(input_file, 'r', encoding='utf-8') as f:
        finger_data = json.load(f)
    
    # 创建一个字典来存储合并后的指纹
    merged_fingerprints = {}
    
    # 遍历所有指纹
    for fingerprint in finger_data['fingerprint']:
        cms = fingerprint['cms']
        method = fingerprint['method']
        location = fingerprint['location']
        keyword = fingerprint['keyword']
        
        # 处理可能缺失的字段
        is_important = fingerprint.get('isImportant', False)
        type_val = fingerprint.get('type', '未知')
        
        # 创建唯一键，基于cms、method和location
        key = f"{cms}||{method}||{location}"
        
        if key in merged_fingerprints:
            # 如果已存在相同键的指纹，则合并keyword数组
            existing_fingerprint = merged_fingerprints[key]
            # 合并keyword数组并去重
            merged_keywords = list(set(existing_fingerprint['keyword'] + keyword))
            existing_fingerprint['keyword'] = merged_keywords
        else:
            # 如果不存在，则添加新的指纹
            merged_fingerprints[key] = fingerprint.copy()
    
    # 转换回列表格式
    deduplicated_fingerprints = list(merged_fingerprints.values())
    
    # 创建新的JSON对象
    result = {
        'fingerprint': deduplicated_fingerprints
    }
    
    # 写入新文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"原始指纹数量: {len(finger_data['fingerprint'])}")
    print(f"去重后指纹数量: {len(deduplicated_fingerprints)}")
    print(f"减少数量: {len(finger_data['fingerprint']) - len(deduplicated_fingerprints)}")
    print(f"去重完成，结果保存在 {output_file} 文件中")

if __name__ == "__main__":
    deduplicate_fingerprints('finger.json', 'finger_deduplicated.json')