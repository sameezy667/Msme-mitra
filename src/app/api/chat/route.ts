import { NextRequest, NextResponse } from "next/server";

// Knowledge base of GST and compliance questions with answers
const knowledgeBase = [
  {
    keywords: ["export", "gst rate", "dubai", "export rate", "zero rated"],
    question: "GST rate for exports",
    answer: `Export of goods is zero-rated under GST. Key points:

• GST Rate: 0% (Zero-rated supply)
• IGST: Not applicable for exports
• Documents Required:
  - Shipping bill
  - Export invoice  
  - Letter of Undertaking (LUT) if IGST not paid
  - Export declaration
• Benefit: Input tax credit available
• Compliance: File GSTR-1 with export details

[Source: Section 16 of IGST Act, 2017 | CBIC Circular No. 8/8/2017-GST]

For Dubai exports specifically, ensure proper customs clearance and shipping documentation.`
  },
  {
    keywords: ["gstr-1", "gstr-3b", "filing date", "due date", "last date"],
    question: "GSTR filing due dates",
    answer: `GST Return Filing Due Dates:

• GSTR-1 (Outward supplies): 11th of following month
• GSTR-3B (Summary return): 20th of following month  
• GSTR-2A: Auto-populated (no filing required)
• Annual Return (GSTR-9): 31st December of following year

Late Fees:
• GSTR-1: ₹50 per day (₹25 per act - CGST & SGST)
• GSTR-3B: ₹50 per day + 18% GST on unpaid tax
• Maximum late fee: ₹5,000

[Source: Section 44 of CGST Act, 2017 | Rule 59 of CGST Rules]

Always file before due date to avoid penalties!`
  },
  {
    keywords: ["documents", "export documents", "shipping", "invoice", "lut"],
    question: "Export documentation requirements",
    answer: `Required Documents for Export:

Mandatory Documents:
• Commercial Invoice
• Packing List  
• Shipping Bill (filed with customs)
• Bill of Lading / Airway Bill
• Certificate of Origin (if required by importing country)
• Letter of Credit (if applicable)

GST Related:
• LUT (Letter of Undertaking) for zero-rated supply
• Export invoice with HSN codes
• GSTR-1 filing with export details

Additional (as per product):
• Quality certificates
• Phytosanitary certificate (for agricultural products)
• Export license (for restricted items)

[Source: Foreign Trade Policy 2023 | CBIC Export Manual]

Ensure all documents are properly stamped and signed!`
  },
  {
    keywords: ["late fee", "penalty", "interest", "calculation"],
    question: "GST late fee and penalty calculation",
    answer: `GST Late Fee Structure:

GSTR-1 Late Filing:
• ₹50 per day (₹25 CGST + ₹25 SGST/UTGST)
• No upper limit mentioned
• No late fee if nil return

GSTR-3B Late Filing:
• ₹50 per day + 18% GST
• Maximum: ₹5,000
• Interest: 18% per annum on unpaid tax

Interest Calculation:
• Rate: 18% per annum (1.5% per month)
• Calculated from due date till payment date
• Applied on unpaid tax amount

[Source: Section 47 & 50 of CGST Act | Notification 49/2019]

File returns on time to avoid accumulating penalties!`
  },
  {
    keywords: ["registration", "gst registration", "threshold", "limit"],
    question: "GST registration requirements",
    answer: `GST Registration Thresholds:

Mandatory Registration:
• Turnover > ₹40 lakhs (₹20 lakhs for special states)
• Interstate supply (any amount)
• E-commerce operators
• Agents and distributors

Voluntary Registration:
• Below threshold limits
• To claim input tax credit
• For business expansion

Documents Required:
• PAN card
• Aadhaar card
• Business registration proof
• Bank statements
• Address proof

Processing Time: 3-7 working days

[Source: Section 22 of CGST Act, 2017]

Register early if planning interstate business!`
  },
  {
    keywords: ["input credit", "itc", "claim", "refund"],
    question: "Input Tax Credit (ITC) rules",
    answer: `Input Tax Credit Guidelines:

Eligible for ITC:
• Tax paid on inputs/input services
• Tax on capital goods
• Inward supplies for business use

Conditions for ITC:
• Valid tax invoice
• Goods/services received
• Tax paid to government
• Return filed by supplier

Time Limit:
• Claim within due date of September return of following year
• OR date of filing annual return (whichever is earlier)

Blocked Credits:
• Motor vehicles (except specified)
• Food, beverages, outdoor catering
• Club membership, health services

[Source: Section 16-17 of CGST Act, 2017]

Maintain proper documentation for ITC claims!`
  },
  {
    keywords: ["composition", "scheme", "small business", "quarterly"],
    question: "Composition scheme for small businesses",
    answer: `GST Composition Scheme Benefits:

Eligibility:
• Turnover ≤ ₹1.5 crores
• Only intra-state supplies
• No interstate sales/purchases

Tax Rates:
• Manufacturing: 1% of turnover
• Trading: 0.5% of turnover  
• Restaurants: 5% of turnover

Benefits:
• Quarterly return filing (GSTR-4)
• No input tax credit
• Simplified compliance
• Lower tax burden

Restrictions:
• Cannot issue tax invoices
• No e-commerce supplies
• Cannot make interstate supplies

[Source: Section 10 of CGST Act, 2017]

Ideal for small businesses with local operations!`
  }
];

function findBestMatch(userMessage: string): string {
  const messageLower = userMessage.toLowerCase();
  
  // Calculate match scores for each knowledge base entry
  const scores = knowledgeBase.map(entry => {
    const matchCount = entry.keywords.reduce((count, keyword) => {
      return count + (messageLower.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    return { entry, score: matchCount };
  });

  // Find the best match
  const bestMatch = scores.reduce((best, current) => 
    current.score > best.score ? current : best
  );

  // If we have a good match (at least 1 keyword), return the answer
  if (bestMatch.score > 0) {
    return bestMatch.entry.answer;
  }

  // Default response for unmatched queries
  return `Thank you for your question! I specialize in GST and compliance matters for Indian MSMEs.

I can help you with:
• GST registration and rates
• Export procedures and documentation  
• Return filing (GSTR-1, GSTR-3B)
• Input Tax Credit (ITC) rules
• Composition scheme
• Late fees and penalties

Could you please rephrase your question to include specific GST or compliance topics?

For immediate assistance, try asking:
• "What is the GST rate for exports?"
• "When is GSTR-1 due date?"
• "What documents needed for export?"

[For complex queries, consider our premium monthly support plan]`;
}

export async function POST(request: NextRequest) {
  try {
    console.log("Chat API: Received POST request");
    const body = await request.json();
    console.log("Chat API: Request body:", body);
    
    const { message } = body;

    if (!message || typeof message !== "string") {
      console.log("Chat API: Invalid message format");
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    console.log("Chat API: Processing message:", message);

    // Simulate a small delay for more natural conversation flow
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = findBestMatch(message);
    console.log("Chat API: Generated response:", response.substring(0, 100) + "...");

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
