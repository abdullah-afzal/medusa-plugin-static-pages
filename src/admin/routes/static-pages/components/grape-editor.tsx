import { useEffect } from "react";
import { Label } from "@medusajs/ui";
import grapesjs, { Editor } from "grapesjs";
import GjsEditor, { useEditor, WithEditor } from "@grapesjs/react";
import GjsPresetWebpage from "grapesjs-preset-webpage";
import GjsBlocksBasic from "grapesjs-blocks-basic";
import GjsBlocksFlex from "grapesjs-blocks-flexbox";
import GjsStyleBg from "grapesjs-style-bg";
import GjsCkEditor from "grapesjs-plugin-ckeditor";

export default function GrapeEditor({
  code,
  setCode,
}: {
  code?: string;
  setCode: (code: string) => void;
}) {
  const onEditor = (editor: Editor) => {
    setCode(
      `<html><head><style>${editor.getCss()}</style></head>${editor.getHtml()}</html>`
    );
  };

  return (
    <div>
      <Label size="small" weight="plus">
        Page Content
      </Label>
      <GjsEditor
        grapesjs={grapesjs}

        options={{
          height: "100vh",
          width: "100%",
          storageManager: false,
          components: code ?? "",
          container: '#editor',
          blockManager: {
            appendTo: '#blocks',
          },
          styleManager: {
            appendTo: '#styles-container',
          },
          layerManager: {
            appendTo: '#layers-container',
          },
          traitManager: {
            appendTo: '#trait-container',
          },
          selectorManager: {
            appendTo: '#styles-container',
          },
          deviceManager: {},
          plugins: [],
          pluginsOpts: {},
        }}
        plugins={[
          GjsPresetWebpage,
          GjsBlocksBasic,
          GjsCkEditor,
          GjsBlocksFlex,
          GjsStyleBg,
          
        ]}
        onEditor={onEditor}
        className="mt-2"
      >
        <WithEditor>
          <MyComponentWithUseEditor setCode={setCode} />
        </WithEditor>
      </GjsEditor>
    </div>
  );
}

function MyComponentWithUseEditor({
  setCode,
}: {
  setCode: (code: string) => void;
}) {
  // The `editor` is always defined.
  const editor = useEditor();
  useEffect(() => {
    editor.on("update", () => {
      setCode(
        `<html><head><style>${editor.getCss()}</style></head>${editor.getHtml()}</html>`
      );
    });

    return () => { };
  }, [editor]);
  return <></>;
}
