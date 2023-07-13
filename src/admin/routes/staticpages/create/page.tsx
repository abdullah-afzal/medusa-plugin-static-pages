import React, {useState} from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

const CreatePage = () => {
    const [title, setTitle] = useState('');
    const [handle, setHandle] = useState('');
    const [metadata, setMetadata] = useState('');
    const [content, setContent] = useState('');


    //change handlers for all input fields
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleHandleChange = (e) => {
        setHandle(e.target.value);
    };

    const handleMetadataChange = (e) => {
        setMetadata(e.target.value);
    };

    const handleEditorChange = (value) => {
        setContent(value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform the addPage service call
        try {
            const post = {
                handle,
                title,
                metadata,
                body: content,
            };

            // const page = await PageService.addPage(post);
            // console.log('Page created:', page);
            console.log('Page created:');

            // Reset the form fields
            setTitle('');
            setHandle('');
            setMetadata('');
            setContent('');
        } catch (error) {
            console.error('Error creating page:', error);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Create Static Page</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Add details of your page below
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                            Title
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Winter Jacket"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="handle" className="block text-sm font-medium leading-6 text-gray-900">
                            Handle
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="handle"
                                    id="handle"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="/winter-jacket"
                                    value={handle}
                                    onChange={handleHandleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="metadata" className="block text-sm font-medium leading-6 text-gray-900">
                            Metadata
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="metadata"
                                    id="metadata"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="100% cotten"
                                    value={metadata}
                                    onChange={handleMetadataChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                            Body
                        </label>
                        <div className="mt-2 ">
                            <ReactQuill
                                style={{ height: '200px' }}
                                placeholder="Enter your content"
                                value={content}
                                onChange={handleEditorChange}
                            />
                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CreatePage;