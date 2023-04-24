export class Relation {
    sourceModelName: string;
    sourceEntityName: string;
    sourceAttributeName: string;
    customSourceName: string | undefined;
    targetModelName: string;
    targetEntityName: string;
    targetAttributeName: string;
    relationType: string;
}

export class QLAttribute {
    name: string;
    mappedName: string;
    attributeType: string;
    isUnique: boolean;
    isId: boolean;
    isArray: boolean;
    isOptional: boolean;
    
    constructor(attribute: string | undefined) {
        this.name = '';
        this.mappedName = '';
        this.attributeType = '';
        this.isArray = false;
        this.isId = false;
        this.isOptional = false;
        this.isUnique = false;
        if (attribute != undefined) {
            const attr = attribute.trim();
        const list: string[] = attr.split(/ * /);
        this.name = list[0];
        this.mappedName = list[0];
        this.isArray = false;
        this.isId = false;
        this.isOptional = false;
        this.isUnique = false;
        if (list[1].includes('?')) {
            this.isOptional = true;
            this.attributeType = list[1].replace('?', '');
        } else if (list[1].includes('[]')) {
            this.isArray = true;
            this.attributeType = list[1].replace('[]', '');
        }
        for (var i = 2; i < list.length; i++){
            if (list[i] == '@id') {
                this.isId = true;
            }else if (list[i] == '@unique') {
                this.isUnique = true;
            }else if (list[i].startsWith('@map(')) {
                this.mappedName = list[i].replace('@map("','').replace('")','');
            }
        }
        }
    }

    getAttribute = (): string => {
        var result: string[] = [];
        result.push(this.name);
        result.push(this.attributeType + this.isOptional ? '?' : this.isArray ? '[]' : '')
        if (this.isId) {
            result.push('@id')
        }
        if (this.isUnique) {
            result.push('@unique')
        }
        result.push('@map("' + this.mappedName + '")');
        return result.join('    ');
    }

}

export type AttributeNameMap = {
    [name: string]: string;
}

export class QLModel{
    name: string;
    entityName: string;
    schemaName: string;
    attributes: QLAttribute[];
    nameMap: AttributeNameMap;
    relations: Relation[];

    constructor(model: string | undefined) {
        this.attributes = [];
        this.nameMap = {};
        this.name = '';
        this.entityName = '';
        this.schemaName = 'callhealth_production';
        this.relations = [];
        if (model != undefined) {
            const modelList: string[] = model.split('\n');
        const firstLine = modelList[0].split(/ * /)[1];
        this.name = firstLine;
            this.entityName = firstLine;
            this.schemaName = 'callhealth_production';
        for (var i = 1; i < modelList.length-1; i++){
            var t: string = modelList[i].trim();
            if (t.startsWith('@@map')) {
                this.entityName = t.replace('@@map("', '').replace('")', '');
            }else if (t.startsWith('@@schema')) {
                this.schemaName = t.replace('@@schema("', '').replace('")', '');
            }else if (t.startsWith('@')) {
                  
            }else {
                var at: QLAttribute = new QLAttribute(t);
                this.nameMap[at.mappedName] = at.name;
                this.attributes.push(at);
            }
        }
        }
    }

    getPrismaModel=():string=>{
        var result: string[] = [];
        result.push('model ' + this.schemaName + '_' + this.entityName + '{');
        for (var i = 0; i < this.attributes.length; i++){
            result.push('  ' + this.attributes[i].getAttribute)
        }

        for (var i = 0; i < this.relations.length; i++){
            //relations code
        }
        return result.join('\n');
    }
}