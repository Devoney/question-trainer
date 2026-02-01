# Agent Guidance

- Prefer RxJS over Angular signals.
- Do not introduce signals into this codebase.
- If signals are found, refactor them to RxJS.
- Angular Material is used for UI components. Any new UI should use Angular Material components.
- When an agent creates or adds to library JSON content, validate it against the library schema in the Angular project root.
	- Example validation command: `node -e "const fs=require('fs'); const {default:Ajv}=require('ajv/dist/2020'); const ajv=new Ajv({allErrors:true}); const schema=JSON.parse(fs.readFileSync('library.schema.json','utf8')); const validate=ajv.compile(schema); const data=JSON.parse(fs.readFileSync('public/example-library.json','utf8')); const valid=validate(data); if(!valid){console.error(JSON.stringify(validate.errors,null,2)); process.exit(1);} console.log('Valid');"`
