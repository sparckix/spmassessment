'use strict';

/* Services */

var SPMassessmentServices = angular.module('SPMassessmentServices', ['ngResource']);

/*SPMassessmentServices.factory('Test', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
*/



SPMassessmentServices.factory('questionsFactory', function() {
	var questions = [
		{
			question: "Requirements are being gathered and registered.",
			options: ["Yes", "No"],
			area: "Requirements gathering",
			business_function: "Requirements management" 
		},
		{
			question: "All incoming requirements are stored in a central database, which is accessible to all relevant stakeholders.",
			options: ["Yes", "No"],
			area: "Requirements gathering",
			business_function: "Requirements management" 
		},
		{
			question: "All incoming requirements are automatically stored in a central database (e.g. by means of an online helpdesk).",
			options: ["Yes", "No"],
			area: "Requirements gathering",
			business_function: "Requirements management" 
		},
		{
			question: "Requirements are gathered from all relevant internal stakeholders: support, services, development, sales & marketing, research & development (parties not present in your organization can be ignored).",
			options: ["Yes", "No"],
			area: "Requirements gathering",
			business_function: "Requirements management" 
		},
		{
			question: "Customer’s and prospect’s requirements are being gathered and registered, and the customer or prospect is informed of the status of their requirements.",
			options: ["Yes", "No"],
			area: "Requirements gathering",
			business_function: "Requirements management" 
		},
		{
			question: "Requirements are systematically gathered from partner companies.",
			options: ["Yes", "No"],
			area: "Requirements gathering",
			business_function: "Requirements management" 
		},	
		{
			question: "Market Requirements are rewritten to Product Requirements using a pre-defined template if the Market Requirement is applicable to a product.",
			options: ["Yes", "No"],
			area: "Requirements identification",
			business_function: "Requirements management" 
		},
		{
			question: "The correctness (“Is the definition correct?”), completeness (“Does the requirement describe all relevant aspects?”), and unambiguousness (“Can the requirement only be interpreted in one way?”) of the requirement is validated.",
			options: ["Yes", "No"],
			area: "Requirements identification",
			business_function: "Requirements management" 
		},
		{
			question: "Market Requirements that describe similar functionality are grouped together by linking Market Requirements and Product Requirements to each other.",
			options: ["Yes", "No"],
			area: "Requirements identification",
			business_function: "Requirements management" 
		},
		{
			question: "Similar requirements are automatically connected by using advanced techniques such as linguistic engineering.",
			options: ["Yes", "No"],
			area: "Requirements identification",
			business_function: "Requirements management" 
		},
		{
			question: "Product requirements are organized based on shared aspects (e.g. type, function, or core asset).",
			options: ["Yes", "No"],
			area: "Requirements organizing",
			business_function: "Requirements management" 
		},
		{
			question: "A requirement’s history is logged by recording the submitter, submission date, changelog, original description, current status (e.g. new, rewritten, validated, organized, scheduled for release X, tested, released in release X), etc. A requirement remains in the database after it has been built, so that it can be reused in a new or related product.",
			options: ["Yes", "No"],
			area: "Requirements organizing",
			business_function: "Requirements management" 
		},
		{
			question: "Dependencies between Market and Product Requirements are determined and registered. A dependency exists when a requirement requires a specific action of another requirement. E.g. a requirement requires that another requirement be implemented too, or that another requirement is not implemented in case of conflicting requirements. This linkage can be supported by using advanced techniques, such as linguistic engineering.",
			options: ["Yes", "No"],
			area: "Requirements organizing",
			business_function: "Requirements management" 
		},
		{
			question: "All relevant internal stakeholders are involved in prioritizing the requirements that should be incorporated in future releases.",
			options: ["Yes", "No"],
			area: "Requirements prioritization",
			business_function: "Release planning"
		},
		{
			question: "A structured prioritization technique is used (e.g. MOSCOW, Wiegers).",
			options: ["Yes", "No"],
			area: "Requirements prioritization",
			business_function: "Release planning"
		},
		{
			question: "Customers and prospects (or representatives thereof) indicate the requirements that should be incorporated in future releases by assigning priorities to the requirements from their point of view. Customers can also be represented in a delegation, select group of customers, or in other more manageable forms.",
			options: ["Yes", "No"],
			area: "Requirements prioritization",
			business_function: "Release planning"
		},
		{
			question: "Information about the costs and revenues of each (group of) requirement(s) is taken into account during the requirements prioritization (costs can be expressed in other means than money).",
			options: ["Yes", "No"],
			area: "Requirements prioritization",
			business_function: "Release planning"
		},
		{
			question: "Partner companies indicate the requirements that should be incorporated in future releases by assigning priorities to the requirements from their point of view.",
			options: ["Yes", "No"],
			area: "Requirements prioritization",
			business_function: "Release planning"
		},	
		{
			question: "During requirements selection for the next release, constraints concerning engineering capacity are taken into account.",
			options: ["Yes", "No"],
			area: "Release definition",
			business_function: "Release planning"
		},
		{
			question: "A standard template is used to write the release definition. The release definition contains aspects such as an overview of the requirements that will be implemented, a time path, and the needed capacity.",
			options: ["Yes", "No"],
			area: "Release definition",
			business_function: "Release planning"
		},
		{
			question: "The release definition is communicated to the internal stakeholders.",
			options: ["Yes", "No"],
			area: "Release definition",
			business_function: "Release planning"
		},
		{
			question: "The optimal release is automatically calculated based upon the constraints of the requirements. At least the engineering capacity, priorities, cost, requirement dependencies are all taken into account.",
			options: ["Yes", "No"],
			area: "Release definition",
			business_function: "Release planning"
		},
		{
			question: "Multiple releases are included in the requirements selection process.",
			options: ["Yes", "No"],
			area: "Release definition",
			business_function: "Release planning"
		},
		{
			question: "The release definition is checked by internal stakeholders, before the software is realized.",
			options: ["Yes", "No"],
			area: "Release definition validation",
			business_function: "Release planning"
		},
		{
			question: "Approval standards are determined and verified by the board before the software is realized (turned over to development).",
			options: ["Yes", "No"],
			area: "Release definition validation",
			business_function: "Release planning"
		},
		{
			question: "A business case (including the ROI) is being written before the software is realized.",
			options: ["Yes", "No"],
			area: "Release definition validation",
			business_function: "Release planning"
		},
		{
			question: "A formal scope change management process is in place, in which all involved stakeholders are informed.",
			options: ["Yes", "No"],
			area: "Scope change management",
			business_function: "Release planning"
		},
		{
			question: "Key dates and checkpoints are monitored in the product delivery.",
			options: ["Yes", "No"],
			area: "Scope change management",
			business_function: "Release planning"
		},
		{
			question: "The impact of problems is determined, and involved stakeholders are informed of the impact.",
			options: ["Yes", "No"],
			area: "Scope change management",
			business_function: "Release planning"
		},
		{
			question: "A process is in place to develop alternative plans, with all relevant stakeholders, to react to the effects of the scope change.",
			options: ["Yes", "No"],
			area: "Scope change management",
			business_function: "Release planning"
		},	
		{
			question: "Internal stakeholders perform a functional validation of the build release to verify that it meets the expected outcome.",
			options: ["Yes", "No"],
			area: "Release build validation",
			business_function: "Release planning"
		},
		{
			question: "The build is validated by external parties (customers, partners) to verify the builds quality (e.g. by setting up a pilot).",
			options: ["Yes", "No"],
			area: "Release build validation",
			business_function: "Release planning"
		},
		{
			question: "Certification by an independent external party is acquired for the release.",
			options: ["Yes", "No"],
			area: "Release build validation",
			business_function: "Release planning"
		},
		{
			question: "Information about the upcoming new release is communicated to the internal stakeholders. This information contains a description of the most important changed and added features, the estimated release date, possible costs involved, information about how the new release can be obtained, possible training dates, etc.",
			options: ["Yes", "No"],
			area: "Launch preparation",
			business_function: "Release planning"
		},
		{
			question: "A formal ‘go’, based upon standard quality rules, must be obtained from the board before the launch can begin.",
			options: ["Yes", "No"],
			area: "Launch preparation",
			business_function: "Release planning"
		},
		{
			question: "Information about the upcoming new release is communicated to the external stakeholders. This information contains a description of the most important changed and added features, the estimated release date, possible costs involved, information about how the new release can be obtained, possible training dates, etc.",
			options: ["Yes", "No"],
			area: "Launch preparation",
			business_function: "Release planning"
		},
		{
			question: "Trainings are organized and documentation is updated for both internal parties) and external parties to help educate them in the new release.",
			options: ["Yes", "No"],
			area: "Launch preparation",
			business_function: "Release planning"
		},
		{
			question: "The time needed to implement the new release at the individual customers is determined, and what type of experts are needed to perform the implementation (e.g. database experts).",
			options: ["Yes", "No"],
			area: "Launch preparation",
			business_function: "Release planning"
		},
		{
			question: "A checklist of all external expressions of the product (e.g. fact sheets, demo’s, presentations) that may need to be updated by changes made in latest release of the product is created. The items are checked, and possibly updated before they are made available to external parties (e.g. customers, partners).",
			options: ["Yes", "No"],
			area: "Launch preparation",
			business_function: "Release planning"
		},
		{
			question: "A plan is created showing which markets you will be going after and how you plan to develop the products for each segment. Eg., in year one you may plan to enter the automotive market by partnering with another company, or you may want to enter the pharmaceutical market in year two by building products in-house or acquiring products.",
			options: ["Yes", "No"],
			area: "Roadmap intelligence",
			business_function: "Product planning"
		},
		{
			question: "An overview is created showing the big picture of important trends in society in the coming years. This picture contains a general view and a view specific for your products industry.",
			options: ["Yes", "No"],
			area: "Roadmap intelligence",
			business_function: "Product planning"
		},
		{
			question: "An overview is created showing the big picture of important developments in terms of technology in the coming years. This picture contains a general view and a view specific for your products industry.",
			options: ["Yes", "No"],
			area: "Roadmap intelligence",
			business_function: "Product planning"
		},	
		{
			question: "An overview is created showing what competing products are doing in terms of their product development in the coming years. The general developments trends among your competitors are shown, and the developments of the most important competing products are depicted with special attention.",
			options: ["Yes", "No"],
			area: "Roadmap intelligence",
			business_function: "Product planning"
		},
		{
			question: "An overview is created showing what your partners will be developing the coming period. Examples of partner products are operating systems, development environments, database, etc. The overview shows what will be happening with the core platform software as well as what the partner organization will be delivering in terms of their own products and development tools that your organization can or will need to use to support the partner products/components.",
			options: ["Yes", "No"],
			area: "Roadmap intelligence",
			business_function: "Product planning"
		},
		{
			question: "All core assets are registered in a standardized manner, and are stored in a central location.",
			options: ["Yes", "No"],
			area: "Core asset roadmapping",
			business_function: "Product planning"
		},
		{
			question: "Core assets are systematically identified among the organization’s products and deliverables surrounding the product.",
			options: ["Yes", "No"],
			area: "Core asset roadmapping",
			business_function: "Product planning"
		},
		{
			question: "A process is in place to actively investigate make-or-buy decisions. This also includes the decision to outsource or subcontract development.",
			options: ["Yes", "No"],
			area: "Core asset roadmapping",
			business_function: "Product planning"
		},
		{
			question: "A roadmap is created for the core assets, which shows how they are sustained, upgraded, and enhanced. This roadmap contains both existing core assets, and core assets that are in development.",
			options: ["Yes", "No"],
			area: "Core asset roadmapping",
			business_function: "Product planning"
		},
		{
			question: "A roadmap is developed detailing the short-term plans. The plans span more than one release.is developed detailing the short-term plans.",
			options: ["Yes", "No"],
			area: "Product roadmapping",
			business_function: "Product planning"
		},
		{
			question: "Release themes are identified and maintained. Themes are decided on together with the internal stakeholders. Identification of the themes results in a list of release themes that are stored centrally, so that requirements, core assets, market trends etc. can be linked to it.",
			options: ["Yes", "No"],
			area: "Product roadmapping",
			business_function: "Product planning"
		},
		{
			question: "Product roadmaps are created in consultation with all relevant internal stakeholders.",
			options: ["Yes", "No"],
			area: "Product roadmapping ",
			business_function: "Product planning"
		},
		{
			question: "The roadmap spans a time period of at least four years.",
			options: ["Yes", "No"],
			area: "Product roadmapping",
			business_function: "Product planning"
		},
		{
			question: "Less detailed variants of the internal roadmap are created for specific external parties (e.g. customers, partners, investors).",
			options: ["Yes", "No"],
			area: "Product roadmapping",
			business_function: "Product planning"
		},
		{
			question: "There is an active search for market opportunities to either expand existing products to, or create new products for. This search exists of doing market research in markets related to or similar to your organizations markets, visiting conferences, listening to customers, etc. All search findings are documented.",
			options: ["Yes", "No"],
			area: "Market analysis",
			business_function: "Portfolio management"
		},	
		{
			question: "A plan is created showing which markets will be pursued and products for each segment can be developed. E.g., in year one, a company might plan to enter the automotive market by partnering with another company, or it may want to enter the pharmaceutical market in year two by building products in-house or acquiring products.",
			options: ["Yes", "No"],
			area: "Market analysis",
			business_function: "Portfolio management"
		},
		{
			question: "A win/loss analysis is performed to research why customers chose or did not choose to buy your organizations products. This capability looks further than just the product features, e.g. the sales process is reviewed.",
			options: ["Yes", "No"],
			area: "Market analysis",
			business_function: "Portfolio management"
		},
		{
			question: "A competitor analysis is performed on an organizational level to analyze what competitors offer, what their strengths are and are going to offer compared to your organizations.",
			options: ["Yes", "No"],
			area: "Market analysis",
			business_function: "Portfolio management"
		},
		{
			question: "External market research parties are used to perform a market analysis specifically for the organization’s product portfolio.",
			options: ["Yes", "No"],
			area: "Market analysis",
			business_function: "Portfolio management"
		},
		{
			question: "(Standard) service level agreements (SLA’s) are set up for customers.",
			options: ["Yes", "No"],
			area: "Partnering & contracting",
			business_function: "Portfolio management"
		},
		{
			question: "Measures are in place to protect the intellectual property of the own organization, and to manage the used intellectual property from other organizations.",
			options: ["Yes", "No"],
			area: "Partnering & contracting",
			business_function: "Portfolio management"
		},
		{
			question: "A process is in place to periodically verify the current distribution channels, and identify alternative distribution channels.",
			options: ["Yes", "No"],
			area: "Partnering & contracting",
			business_function: "Portfolio management"
		},
		{
			question: "A process is in place to establish the pricing model and periodically verify whether it still fits the market.",
			options: ["Yes", "No"],
			area: "Partnering & contracting",
			business_function: "Portfolio management"
		},
		{
			question: "A partner network and/or partner portals are used to regulate partnering. Key performance indicators are set up to monitor the performance of partners on a regular basis.",
			options: ["Yes", "No"],
			area: "Partnering & contracting",
			business_function: "Portfolio management"
		},
		{
			question: "The current life phase is determined, at least once per year, for each product in the organizations portfolio. This analysis is based on both financial and technical aspects. Information is thus gathered from all relevant internal stakeholders (e.g. company board, sales, development).",
			options: ["Yes", "No"],
			area: "Product lifecycle management",
			business_function: "Portfolio management"
		},
		{
			question: "A decision process is in place to decide whether or not to incorporate trends in one of the current products or in newly to be developed products.",
			options: ["Yes", "No"],
			area: "Product lifecycle management",
			business_function: "Portfolio management"
		},
		{
			question: "A product scope analysis is performed to identify overlaps and gaps between the products in the organizations product portfolio.",
			options: ["Yes", "No"],
			area: "Product lifecycle management",
			business_function: "Portfolio management"
		},
		{
			question: "A business case is performed for major product revisions (revisions spanning multiple release) or when the product strategy is changed. We use Kittlaus & Clough (2009) definition in which a business case is the “comparison of the costs associated with the product or project to the quantified economic benefits or value to be derived”.",
			options: ["Yes", "No"],
			area: "Product lifecycle management",
			business_function: "Portfolio management"
		},	
		{
			question: "Product lines are developed. The architecture of the product line is documented, and its goal is clearly defined. A software product line is defined as a set of software intensive systems sharing a common, managed set of features that satisfy the specific needs of a particular market segment or mission and that are developed from a common set of core assets in a prescribed way (Clements & Northrop, 2002).",
			options: ["Yes", "No"],
			area: "Product lifecycle management",
			business_function: "Portfolio management"
		}					
	];
 
	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});