/// <reference lib="dom" />

declare module '@xmldom/xmldom' {
	var DOMParser: DOMParserStatic;
	var XMLSerializer: XMLSerializerStatic;

	interface DOMImplementation {
		/**
		 * The DOMImplementation interface represents an object providing methods
		 * which are not dependent on any particular document.
		 * Such an object is returned by the `Document.implementation` property.
		 *
		 * __The individual methods describe the differences compared to the specs.__
		 *
		 * @constructor
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
		 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core
		 *   (Initial)
		 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
		 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
		 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
		 */
		new (): DOMImplementation;

		/**
		 * Creates an XML Document object of the specified type with its document element.
		 *
		 * __It behaves slightly different from the description in the living standard__:
		 * - There is no interface/class `XMLDocument`, it returns a `Document` instance (with it's
		 * `type` set to `'xml'`).
		 * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
		 * - The methods provided by this implementation are not validating names or qualified names.
		 *   (They are only validated by the SAX parser when calling `DOMParser.parseFromString`)
		 * -
		 *
		 * @param {string | null} namespaceURI
		 * @param {string} qualifiedName
		 * @param {DocumentType | null} [doctype=null]
		 * @returns {Document} the XML document
		 *
		 * @see #createHTMLDocument
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
		 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
		 *   Level 2 Core (initial)
		 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
		 *
		 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
		 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
		 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
		 */
		createDocument(
			namespaceURI: string | null,
			qualifiedName: string,
			doctype?: DocumentType | null
		): Document;

		/**
		 * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
		 *
		 * __This behavior is slightly different from the in the specs__:
		 * - this implementation is not validating names or qualified names
		 *   (when parsing XML strings, the SAX parser takes care of that)
		 * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
		 *
		 * @param {string} qualifiedName
		 * @param {string} [publicId]
		 * @param {string} [systemId]
		 * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument`
		 *   upon document creation or can be put into the document via methods like
		 *   `Node.insertBefore()` or `Node.replaceChild()`
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
		 *   MDN
		 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
		 *   Level 2 Core
		 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
		 *   Standard
		 *
		 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
		 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
		 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
		 */
		createDocumentType(
			qualifiedName: string,
			publicId?: string,
			systemId?: string
		): DocumentType;

		/**
		 * Returns an HTML document, that might already have a basic DOM structure.
		 *
		 * __It behaves slightly different from the description in the living standard__:
		 * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
		 * omitted)
		 * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
		 *
		 * @param {string | false} [title]
		 * @returns {Document} The HTML document
		 *
		 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
		 * @see https://dom.spec.whatwg.org/#html-document
		 */
		createHTMLDocument(title?: string | false): Document;

		/**
		 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
		 * feature is supported. The different implementations fairly diverged in what kind of features
		 * were reported. The latest version of the spec settled to force this method to always return
		 * true, where the functionality was accurate and in use.
		 *
		 * @deprecated It is deprecated and modern browsers return true in all cases.
		 *
		 * @param {string} feature
		 * @param {string} [version]
		 * @returns {boolean} always true
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
		 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
		 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
		 */
		hasFeature(feature: string, version?: string): true;
	}

	interface DOMParserStatic {
		new (): DOMParser;

		/**
		 * The DOMParser interface provides the ability to parse XML or HTML source code
		 * from a string into a DOM `Document`.
		 *
		 * _xmldom is different from the spec in that it allows an `options` parameter,
		 * to control the behavior._
		 *
		 * @param {DOMParserOptions} [options]
		 * @constructor
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
		 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
		 */
		new (options: DOMParserOptions): DOMParser;
	}

	interface XMLSerializerStatic {
		new (): XMLSerializer;
	}

	type MIME_TYPE =
		| 'application/xhtml+xml'
		| 'application/xml'
		| 'image/svg+xml'
		| 'text/html'
		| 'text/xml';

	/**
	 * The DOMParser interface provides the ability to parse XML or HTML source code
	 * from a string into a DOM `Document`.
	 *
	 * _xmldom is different from the spec in that it allows an `options` parameter,
	 * to control the behavior._
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
	 */
	interface DOMParser {
		/**
		 * Parses `source` using the options in the way configured by the `DOMParserOptions` of `this`
		 * `DOMParser`. If `mimeType` is `text/html` an HTML `Document` is created, otherwise an XML
		 * `Document` is created.
		 *
		 * __It behaves different from the description in the living standard__:
		 * - Only allows the first argument to be a string (calls `error` handler otherwise.)
		 * - Uses the `options` passed to the `DOMParser` constructor to modify the
		 *   behavior/implementation.
		 * - Instead of creating a Document containing the error message,
		 *   it triggers `errorHandler`(s) when unexpected input is found.
		 *   All error handlers can throw an `Error`. By default, only the `fatalError` handler throws
		 * (a `ParseError`).
		 * - All errors thrown during the parsing that are not a `ParseError` are caught and reported
		 * using the `error` handler.
		 * - If no `Document` was created (because no valid node was ever parsed
		 * - If no `ParseError` is thrown, this method returns the `DOMHandler.doc`,
		 *   which most is the `Document` that has been created during parsing.
		 *   __**Warning: By configuring a faulty DOMHandler implementation,
		 *   the specified behavior can completely be broken.**__
		 *
		 * @param {string} source Only string input is possible!
		 * @param {string} [mimeType='application/xml']
		 *        the mimeType or contentType of the document to be created
		 *        determines the `type` of document created (XML or HTML)
		 * @throws ParseError for specific errors depending on the configured `errorHandler`s and/or
		 *   `domBuilder`
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
		 * @see https://html.spec.whatwg.org/#dom-domparser-parsefromstring-dev
		 */
		parseFromString(source: string, mimeType: MIME_TYPE): Document;
	}

	interface XMLSerializer {
		serializeToString(node: Node): string;
	}

	interface DOMParserOptions {
		/**
		 * The method to use instead of `Object.assign` (defaults to `conventions.assign`),
		 * which is used to copy values from the options before they are used for parsing.
		 *
		 * @type {function (target: object, source: object | null | undefined): object}
		 * @readonly
		 * @private
		 * @see conventions.assign
		 */
		assign?: typeof Object.assign;
		/**
		 * For internal testing: The class for creating an instance for handling events from the SAX
		 * parser.
		 * __**Warning: By configuring a faulty implementation, the specified behavior can completely
		 * be broken.**__
		 *
		 * @readonly
		 * @private
		 */
		domHandler?: unknown;

		/**
		 * DEPRECATED: Use `onError` instead!
		 *
		 * For backwards compatibility:
		 * If it is a function, it will be used as a value for `onError`,
		 * but it receives different argument types than before 0.9.0.
		 * @throws If it is an object.
		 * @deprecated
		 */
		errorHandler?: ErrorHandlerFunction;

		/**
		 * Configures if the nodes created during parsing
		 * will have a `lineNumber` and a `columnNumber` attribute
		 * describing their location in the XML string.
		 * Default is true.
		 * @type {boolean}
		 * @readonly
		 */
		locator?: boolean;

		/**
		 * used to replace line endings before parsing, defaults to `normalizeLineEndings`,
		 * which normalizes line endings according to <https://www.w3.org/TR/xml11/#sec-line-ends>.
		 *
		 * @type {(string) => string}
		 * @readonly
		 */
		normalizeLineEndings?: (source: string) => string;
		/**
		 * A function that is invoked for every error that occurs during parsing.
		 * It receives an error message as the first parameter,
		 * and the `DOMHandler` as the second parameter.
		 * When it is provided, errors are not logged to the console.
		 * When it throws, a `ParseError` is thrown to cancel any further parsing.
		 *
		 * @param level the error level as reported by the SAXParser, should be ignored
		 * @param message the error message
		 * @param context the DOMHandler instance used for parsing
		 */
		onError?: ErrorHandlerFunction;

		/**
		 * The default namespace can be provided by the key that is the empty string.
		 * When the `mimeType` for HTML, XHTML or SVG are passed to `parseFromString`,
		 * the default namespace that will be used,
		 * will be overridden according to the specification.
		 * @type {Readonly<object>}
		 * @readonly
		 */
		xmlns?: Record<string, string | null | undefined>;
	}

	interface ErrorHandlerFunction {
		(level: 'warn' | 'error' | 'fatalError', msg: string, context: any): void;
	}
}
