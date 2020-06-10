package org.mensajes.parser;

import javax.management.MBeanRegistrationException;
import java.nio.file.Paths;
import java.util.regex.Pattern;

public class ParseMSG {
	// Style your received messages
	public static String parseMensajeRecv(String msg) {
		String[] words = msg.split("\\|\\|\\|\\|\\|");
		String nick = words[0];
		String message = words[1];

		String ret;
		
		ret = "<div style=\"text-align: left;\">" +
				"<p style=\"color: red;\">"+nick+"</p>"+
				"<p>"+message+"</p>"+
				"</div>";
		
		return ret;
	}
	
	// Style your sent messages
	public static String parseMensajeEnv(String msg) {
		String[] words = msg.split("\\|\\|\\|\\|\\|");
		String nick = words[0];
		String message = words[1];
		String ret;
		
		ret = "<div style=\"text-align: right;\">" +
					"<p style=\"color: green;\">"+nick+"</p>"+
					"<p>"+message+"</p>"+
				"</div>";
		
		return ret;
	}

}
