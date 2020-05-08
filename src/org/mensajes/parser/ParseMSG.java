package org.mensajes.parser;

public class ParseMSG {

	// Style your received messages
	public static String parseMensajeRecv(String msg) {
		
		String ret;
		
		ret = "NAZAR" +
				"<p text-align:left;color:green;>"+msg+"</p>";
		
		return ret;
	}
	
	// Style your sent messages
	public static String parseMensajeEnv(String msg) {
		String ret;
		
		ret = "KUBA" +
				"<p text-align:right;color:red;>"+msg+"</p>";
		
		return ret;
	}

}
